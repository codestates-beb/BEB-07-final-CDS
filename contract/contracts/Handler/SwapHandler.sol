// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../Swaps/Swap.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract SwapHandler {
  using Counters for Counters.Counter;
  using SafeMath for uint256;
  using LibClaim for uint256;
  Counters.Counter internal _swapId;

  Swap private swap;

  struct Deposit {
    uint256 deposit;
    bool isPaid;
  }

  mapping(uint256 => Swap) private _swaps;

  mapping(uint256 => uint256) private _nextPayDate;

  mapping(uint256 => Deposit[2]) private _deposits;

  constructor() {}

  function _createSwap(
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

    // newSwap.setStatus(Swap.Status.pending);

    _isBuyer ? _createSwapByBuyer(newSwapId) : _createSwapBySeller(newSwapId);

    return newSwapId;
  }

  function _acceptSwap(
    bool _isBuyerHost,
    uint256 _initAssetPrice,
    uint256 _acceptedSwapId
  ) internal returns (uint256) {
    Swap targetSwap = _swaps[_acceptedSwapId];
    targetSwap.setInitAssetPrice(_initAssetPrice);

    _isBuyerHost
      ? _createSwapBySeller(_acceptedSwapId)
      : _createSwapByBuyer(_acceptedSwapId);

    // check => 토큰으로 처리시 바로 보내고 이거도 되야함.
    _nextPayDate[_acceptedSwapId] =
      block.timestamp +
      getInterval(_acceptedSwapId);

    targetSwap.setStatus(Swap.Status.active);

    return _acceptedSwapId;
  }

  function _cancelSwap(uint256 _targetSwapId) internal {
    _clearDeposit(_targetSwapId);
    _swaps[_targetSwapId].setStatus(Swap.Status.inactive);
  }

  function _payPremium(uint256 _targetSwapId) internal {
    _nextPayDate[_targetSwapId] = block.timestamp + getInterval(_targetSwapId);
    getSwap(_targetSwapId).setRounds(getRounds(_targetSwapId) - 1);
  }

  function _claimSwap(uint256 _targetSwapId) internal {
    _clearDeposit(_targetSwapId);
    _swaps[_targetSwapId].setStatus(Swap.Status.claimed);
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

  function getClaimReward(uint256 swapId) public view returns (uint256) {
    return _swaps[swapId].getClaimReward();
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

  function getDeposits(uint256 swapId) public view returns (Deposit[2] memory) {
    return _deposits[swapId];
  }

  function _createSwapByBuyer(uint256 swapId) private {
    _swaps[swapId].setBuyer(msg.sender);
    _deposits[swapId][0].deposit = getPremium(swapId).mul(3);
    _deposits[swapId][0].isPaid = true;
  }

  function _createSwapBySeller(uint256 swapId) private {
    _swaps[swapId].setSeller(msg.sender);
    _deposits[swapId][1].deposit = getSellerDeposit(swapId);
    _deposits[swapId][1].isPaid = true;
  }

  function _clearDeposit(uint256 swapId) private {
    for (uint i = 0; i <= 1; i++) {
      _deposits[swapId][i].deposit = 0;
      _deposits[swapId][i].isPaid = false;
    }
  }

  // modifiers
  modifier isBuyer(uint256 swapId) {
    require(msg.sender == getBuyer(swapId), 'Only buyer of the CDS can call');
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
