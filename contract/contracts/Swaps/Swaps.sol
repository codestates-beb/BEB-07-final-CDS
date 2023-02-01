// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../Oracle/PriceConsumer.sol';
import '../libs/LibClaim.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract Swaps is PriceConsumer {
  using Counters for Counters.Counter;
  using LibClaim for uint256;
  using SafeMath for uint256;
  Counters.Counter internal _swapId;

  struct Swap {
    uint256 initAssetPrice;
    uint256 claimPrice;
    uint256 liquidationPrice;
    uint256 premium;
    uint256 sellerDeposit;
    uint32 premiumInterval;
  }

  struct Deposit {
    uint256 deposit;
    bool isPaid;
  }

  enum swapStatus {
    inactive,
    pending,
    active,
    claimed
  }

  // mappings

  // key-value entity that maps the ID of the swap to detail infos about price.
  mapping(uint256 => Swap) private _swaps;

  // key-value entity that maps the ID of the swap to the status of the swap.
  mapping(uint256 => swapStatus) private _swapsStatus;

  // key-value entity that maps the ID of the swap to the rounds left.
  mapping(uint256 => uint32) private _rounds;

  // key-value entity that maps the ID of the swap to next date to pay premium.
  mapping(uint256 => uint256) private _nextPayDate;

  // key-value entity that maps the ID of the swap to buyer/seller.
  // _particpants[swapId][0] => buyer's address
  // _particpants[swapId][1] => seller's address
  mapping(uint256 => address[2]) private _participants;

  // key-value entity that maps id of the swap to the detail of buyer/seller's deposits.
  // _particpants[swapId][0] => buyer's deposit
  // _particpants[swapId][1] => seller's deposit
  mapping(uint256 => Deposit[2]) private _deposits;

  // modifiers

  modifier isBuyer(uint256 swapId) {
    require(
      msg.sender == _participants[swapId][0],
      'Only buyer of the CDS can call'
    );
    _;
  }

  modifier isPending(uint256 swapId) {
    require(
      _swapsStatus[swapId] == swapStatus.pending,
      'The status of the CDS should be pending'
    );
    _;
  }

  modifier isActive(uint256 swapId) {
    require(
      _swapsStatus[swapId] == swapStatus.active,
      'The status of the CDS should be pending'
    );
    _;
  }

  constructor() {}

  // transactions

  function _createSwap(
    bool _isBuyer,
    uint256 _initAssetPrice,
    uint256 _claimPrice,
    uint256 _liquidationPrice,
    uint256 _sellerDeposit,
    uint256 _premium,
    uint32 _premiumInterval,
    uint32 _totalRounds
  ) internal returns (uint256) {
    _swapId.increment();
    uint256 newSwapId = _swapId.current();
    Swap storage newSwap = _swaps[newSwapId];

    newSwap.initAssetPrice = _initAssetPrice;
    newSwap.claimPrice = _claimPrice;
    newSwap.liquidationPrice = _liquidationPrice;
    newSwap.premium = _premium;
    newSwap.sellerDeposit = _sellerDeposit;
    newSwap.premiumInterval = _premiumInterval;

    _rounds[newSwapId] = _totalRounds;

    _swapsStatus[newSwapId] = swapStatus.pending;

    _isBuyer ? _createSwapByBuyer(newSwapId) : _createSwapBySeller(newSwapId);
    return newSwapId;
  }

  function _acceptSwap(
    bool _isBuyerHost,
    uint256 _initAssetPrice,
    uint256 _acceptedSwapId
  ) internal returns (uint256) {
    Swap storage aSwap = _swaps[_acceptedSwapId];
    aSwap.initAssetPrice = _initAssetPrice;

    _isBuyerHost
      ? _createSwapBySeller(_acceptedSwapId)
      : _createSwapByBuyer(_acceptedSwapId);

    _nextPayDate[_acceptedSwapId] = block.timestamp + aSwap.premiumInterval;

    _swapsStatus[_acceptedSwapId] = swapStatus.active;

    return _acceptedSwapId;
  }

  function _cancelSwap(uint256 _targetSwapId) internal {
    _clearDeposit(_targetSwapId);
    _swapsStatus[_targetSwapId] = swapStatus.inactive;
  }

  function _claimSwap(uint256 _targetSwapId) internal {
    _clearDeposit(_targetSwapId);
    _swapsStatus[_targetSwapId] = swapStatus.claimed;
  }

  function _payPremium(uint256 _targetSwapId) internal {
    Swap memory targetSwap = _swaps[_targetSwapId];
    _nextPayDate[_targetSwapId] = block.timestamp + targetSwap.premiumInterval;
    _rounds[_targetSwapId] -= 1;
  }

  function getClaimReward(uint256 swapId) public view returns (uint256) {
    uint256 currPrice = getPriceFromOracle();
    Swap memory targetSwap = getSwap(swapId);
    if (targetSwap.claimPrice < currPrice) {
      return 0;
    }
    uint256 claimReward = targetSwap.sellerDeposit.calcClaimReward(
      targetSwap.liquidationPrice,
      targetSwap.initAssetPrice,
      currPrice
    );
    return claimReward;
  }

  function getSwap(uint256 swapId) public view returns (Swap memory) {
    return _swaps[swapId];
  }

  function getBuyer(uint256 swapId) public view returns (address) {
    return _participants[swapId][0];
  }

  function getSeller(uint256 swapId) public view returns (address) {
    return _participants[swapId][1];
  }

  function getSwapId() public view returns (Counters.Counter memory) {
    return _swapId;
  }

  function getDeposits(uint256 swapId) public view returns (Deposit[2] memory) {
    return _deposits[swapId];
  }

  function getSwapStatus(uint256 swapId) public view returns (swapStatus) {
    return _swapsStatus[swapId];
  }

  function getRoundsLeft(uint256 swapId) public view returns (uint32) {
    return _rounds[swapId];
  }

  function _createSwapByBuyer(uint256 swapId) private {
    _participants[swapId][0] = msg.sender;
    _deposits[swapId][0].deposit = getSwap(swapId).premium.mul(3);
    _deposits[swapId][0].isPaid = true;
  }

  function _createSwapBySeller(uint256 swapId) private {
    _participants[swapId][1] = msg.sender;
    _deposits[swapId][1].deposit = getSwap(swapId).sellerDeposit;
    _deposits[swapId][1].isPaid = true;
  }

  function _clearDeposit(uint256 swapId) private {
    for (uint i = 0; i <= 1; i++) {
      _deposits[swapId][i].deposit = 0;
      _deposits[swapId][i].isPaid = false;
    }
  }
}
