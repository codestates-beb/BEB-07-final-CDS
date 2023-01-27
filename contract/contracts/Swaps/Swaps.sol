// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../Oracle/PriceConsumer.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract Swaps is PriceConsumer {
  using Counters for Counters.Counter;
  using SafeMath for uint256;
  Counters.Counter internal _swapId;

  enum Status {
    inactive,
    pending,
    active,
    claimed
  }

  mapping(uint256 => Swap) internal _swaps;

  struct Buyer {
    address addr;
    uint256 deposit;
    uint256 lastPayDate;
    uint256 nextPayDate;
  }

  struct Seller {
    address addr;
    uint256 deposit;
    bool isDeposited;
  }

  struct Swap {
    Buyer buyer;
    Seller seller;
    uint256 initAssetPrice;
    uint256 amountOfAssets;
    uint256 claimPrice;
    uint256 liquidationPrice;
    uint256 premium;
    uint256 premiumRate;
    uint256 premiumInterval;
    uint256 totalPremiumRounds;
    Status status;
  }

  modifier isBuyer(uint256 swapId) {
    require(
      msg.sender == _swaps[swapId].buyer.addr,
      'Only buyer of the CDS can call'
    );
    _;
  }

  modifier isPending(uint256 swapId) {
    require(
      _swaps[swapId].status == Status.pending,
      'The status of the CDS should be pending'
    );
    _;
  }

  modifier isActive(uint256 swapId) {
    require(
      _swaps[swapId].status == Status.active,
      'The status of the CDS should be pending'
    );
    _;
  }

  uint256 private _premiumRate;

  constructor() {
    _premiumRate = 2;
  }

  function _createSwap(
    address _addr,
    uint256 _initAssetPrice,
    uint256 _amountOfAssets,
    uint256 _claimPrice,
    uint256 _liquidationPrice,
    uint256 _sellerDeposit,
    uint256 _premium,
    uint256 _premiumInterval,
    uint256 _totalPremiumRounds
  ) internal returns (uint256) {
    _swapId.increment();
    uint256 newSwapId = _swapId.current();
    Swap storage newSwap = _swaps[newSwapId];

    newSwap.buyer.addr = _addr;
    newSwap.buyer.deposit = _premium.mul(3);

    newSwap.initAssetPrice = _initAssetPrice;
    newSwap.amountOfAssets = _amountOfAssets;
    newSwap.claimPrice = _claimPrice;
    newSwap.liquidationPrice = _liquidationPrice;
    newSwap.premium = _premium;
    newSwap.premiumRate = _premiumRate;
    newSwap.premiumInterval = _premiumInterval;
    newSwap.totalPremiumRounds = _totalPremiumRounds;
    newSwap.status = Status.pending;

    newSwap.seller.deposit = _sellerDeposit;

    return newSwapId;
  }

  function _acceptSwap(
    address _addr,
    uint256 _initAssetPrice,
    uint256 _acceptedSwapId
  ) internal returns (uint256) {
    Swap storage aSwap = _swaps[_acceptedSwapId];

    aSwap.seller.addr = _addr;
    aSwap.initAssetPrice = _initAssetPrice;

    aSwap.seller.isDeposited = true;

    aSwap.buyer.lastPayDate = block.timestamp;
    aSwap.buyer.nextPayDate = block.timestamp + aSwap.premiumInterval;

    aSwap.status = Status.active;

    return _acceptedSwapId;
  }

  function _cancelSwap(uint256 _targetSwapId) internal {
    Swap storage targetSwap = _swaps[_targetSwapId];
    targetSwap.buyer.deposit = 0;
    targetSwap.seller.deposit = 0;
    targetSwap.status = Status.inactive;
  }

  function _claimSwap(uint256 _targetSwapId) internal {
    Swap storage targetSwap = _swaps[_targetSwapId];
    // buyer
    targetSwap.buyer.deposit = 0;
    targetSwap.buyer.nextPayDate = 0;

    // seller
    targetSwap.seller.deposit = 0;
    targetSwap.seller.isDeposited = false;

    targetSwap.status = Status.claimed;
  }

  function _payPremium(uint256 _targetSwapId) internal {
    Swap storage targetSwap = _swaps[_targetSwapId];
    // date 갱신
    targetSwap.buyer.lastPayDate = block.timestamp;
    targetSwap.buyer.nextPayDate = block.timestamp + targetSwap.premiumInterval;
  }

  // function _checkDate(uint256 _targetSwapId) internal returns (bool) {
  //   return true;
  // }
}
