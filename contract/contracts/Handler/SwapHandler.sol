// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../Swaps/Swap.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract SwapHandler {
  using Counters for Counters.Counter;
  using SafeMath for uint256;
  Counters.Counter internal _swapId;

  mapping(uint256 => Swap) private _swaps;

  mapping(uint256 => uint256) private _nextPayDate;

  constructor() {}

  function _create(
    bool _isBuyer,
    uint256 _initAssetPrice,
    uint256 _claimPrice,
    uint256 _liquidationPrice,
    uint256 _sellerDeposit,
    uint256 _premium,
    uint256 _premiumInterval,
    uint32 _totalRounds
  ) internal returns (uint256) {
    _swapId.increment();
    uint256 newSwapId = _swapId.current();

    Swap newSwap = new Swap(
      _initAssetPrice,
      _claimPrice,
      _liquidationPrice,
      _premium,
      _sellerDeposit,
      _premiumInterval,
      _totalRounds
    );
    _swaps[newSwapId] = newSwap;

    _isBuyer ? newSwap.setBuyer(msg.sender) : newSwap.setSeller(msg.sender);

    return newSwapId;
  }

  function _accept(
    bool _isBuyerHost,
    uint256 _initAssetPrice,
    uint256 _acceptedSwapId
  ) internal isPending(_acceptedSwapId) returns (uint256) {
    Swap targetSwap = _swaps[_acceptedSwapId];
    targetSwap.setInitAssetPrice(_initAssetPrice);

    _isBuyerHost
      ? targetSwap.setSeller(msg.sender)
      : targetSwap.setBuyer(msg.sender);

    // check => 토큰으로 처리시 바로 보내고 이거도 되야함.
    _nextPayDate[_acceptedSwapId] += getInterval(_acceptedSwapId);

    targetSwap.setStatus(Swap.Status.active);

    return _acceptedSwapId;
  }

  function _cancel(uint256 _targetSwapId) internal     
    isParticipants(_targetSwapId)
    isPending(_targetSwapId) {
    getSwap(_targetSwapId).setStatus(Swap.Status.inactive);
  }

  function _close(uint256 _targetSwapId) internal isBuyer(_targetSwapId) isActive(_targetSwapId) {
    getSwap(_targetSwapId).setStatus(Swap.Status.expired);
  }

  function _payPremium(uint256 _targetSwapId) internal isBuyer(_targetSwapId) isActive(_targetSwapId) {
    _nextPayDate[_targetSwapId] += getInterval(_targetSwapId);
    getSwap(_targetSwapId).setRounds(getRounds(_targetSwapId) - 1);
  }

  function _claim(uint256 _targetSwapId) internal     
    isBuyer(_targetSwapId)
    isActive(_targetSwapId) {
    getSwap(_targetSwapId).setStatus(Swap.Status.claimed);
  }

  function _expireByRounds(uint256 _targetSwapId) internal isSeller(_targetSwapId) isActive(_targetSwapId) {
    require((block.timestamp >= _nextPayDate[_targetSwapId]) && (getTotalRounds(_targetSwapId) == 0),
    'Too early to call');
    getSwap(_targetSwapId).setStatus(Swap.Status.expired);
  }

  // require문에서 validation of totalRounds => buyerDeposit 
  function _expireByDate(uint256 _targetSwapId) internal isSeller(_targetSwapId) isActive(_targetSwapId) {
    require((block.timestamp >= _nextPayDate[_targetSwapId]) && (getTotalRounds(_targetSwapId) == 0),
    'Too early to call');
    getSwap(_targetSwapId).setStatus(Swap.Status.expired);
  }

  function getSwapId() public view returns (Counters.Counter memory) {
    return _swapId;
  }

  function getSwap(uint256 swapId) public view returns (Swap) {
    return _swaps[swapId];
  }

  function getPrices(uint256 swapId) public view returns (uint256[5] memory) {
    return _swaps[swapId].getPrices();
  }

  function getPremium(uint256 swapId) public view returns (uint256) {
    return _swaps[swapId].premium();
  }

  function getSellerDeposit(uint256 swapId) public view returns (uint256) {
    return _swaps[swapId].sellerDeposit();
  }

  function getStatus(uint256 swapId) public view returns (Swap.Status) {
    return _swaps[swapId].status();
  }

  function getRounds(uint256 swapId) public view returns (uint32) {
    return _swaps[swapId].rounds();
  }

  function getInterval(uint256 swapId) public view returns (uint256) {
    return _swaps[swapId].interval();
  }

  function getBuyer(uint256 swapId) public view returns (address) {
    return _swaps[swapId].getBuyer();
  }

  function getSeller(uint256 swapId) public view returns (address) {
    return _swaps[swapId].getSeller();
  }

  function getNextPayDate(uint256 swapId) public view returns (uint256) {
    return _nextPayDate[swapId];
  }

  function getTotalRounds(uint256 swapId) public view returns (uint32) {
    return _swaps[swapId].totalRounds();
  }

  // modifiers
  modifier isBuyer(uint256 swapId) {
    require(msg.sender == getBuyer(swapId), 'Only buyer of the CDS can call');
    _;
  }

  modifier isSeller(uint256 swapId) {
    require(msg.sender == getSeller(swapId), 'Only seller of the CDS can call');
    _;
  }

  modifier isParticipants(uint256 swapId) {
    require(
      msg.sender == getBuyer(swapId) || msg.sender == getSeller(swapId),
      'Only buyer/seller of the CDS can call'
    );
    _;
  }

  modifier isPending(uint256 swapId) {
    require(
      getStatus(swapId) == Swap.Status.pending,
      'The status of the CDS should be pending'
    );
    _;
  }

  modifier isActive(uint256 swapId) {
    require(
      getStatus(swapId) == Swap.Status.active,
      'The status of the CDS should be active'
    );
    _;
  }
}
