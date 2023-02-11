// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../Swaps/Swap.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract SwapFactory is Ownable {
  using Counters for Counters.Counter;
  Counters.Counter internal _swapId;

  mapping(uint256 => Swap) private _swaps;

  mapping(uint256 => uint256) public nextPayDate;

  function create(
    bool _isBuyer,
    uint256 _initAssetPrice,
    uint256 _claimPrice,
    uint256 _liquidationPrice,
    uint256 _sellerDeposit,
    uint256 _premium,
    uint32 _totalRounds,
    uint32 _assetType
  ) external returns (uint256) {
    _swapId.increment();
    uint256 newSwapId = _swapId.current();

    Swap newSwap = new Swap(
      _initAssetPrice,
      _claimPrice,
      _liquidationPrice,
      _premium,
      _sellerDeposit,
      _totalRounds,
      _assetType
    );
    _swaps[newSwapId] = newSwap;

    _isBuyer ? newSwap.setBuyer(msg.sender) : newSwap.setSeller(msg.sender);

    return newSwapId;
  }

  function accept(
    bool _isBuyerHost,
    uint256 _acceptedSwapId
  ) external isPending(_acceptedSwapId) returns (uint256) {
    Swap targetSwap = _swaps[_acceptedSwapId];

    _isBuyerHost
      ? targetSwap.setSeller(msg.sender)
      : targetSwap.setBuyer(msg.sender);

    nextPayDate[_acceptedSwapId] = block.timestamp + 4 weeks;

    targetSwap.setStatus(Swap.Status.active);

    return _acceptedSwapId;
  }

  function cancel(uint256 _targetSwapId) external isPending(_targetSwapId) {
    getSwap(_targetSwapId).setStatus(Swap.Status.inactive);
  }

  function close(uint256 _targetSwapId) external isActive(_targetSwapId) {
    getSwap(_targetSwapId).setStatus(Swap.Status.expired);
  }

  function payPremium(uint256 _targetSwapId) external isActive(_targetSwapId) {
    require(getRounds(_targetSwapId) > 0, 'Round already ended');
    nextPayDate[_targetSwapId] += 4 weeks;
    getSwap(_targetSwapId).setRounds(getRounds(_targetSwapId) - 1);
  }

  function claim(uint256 _targetSwapId) external isActive(_targetSwapId) {
    getSwap(_targetSwapId).setStatus(Swap.Status.claimed);
  }

  // getter transactions
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

  function getBuyer(uint256 swapId) public view returns (address) {
    return _swaps[swapId].getBuyer();
  }

  function getSeller(uint256 swapId) public view returns (address) {
    return _swaps[swapId].getSeller();
  }

  // modifiers
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
