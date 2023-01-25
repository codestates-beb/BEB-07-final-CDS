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
    pending,
    active,
    inactive,
    closed
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
    uint256 claimPrice;
    uint256 liquidationPrice;
    uint256 premium;
    uint256 premiumInterval;
    uint256 totalPremiumRounds;
    Status status;
  }

  function _createSwap(
    address _addr,
    uint256 _initAssetPrice,
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
    newSwap.claimPrice = _claimPrice;
    newSwap.liquidationPrice = _liquidationPrice;
    newSwap.premium = _premium;
    newSwap.premiumInterval = _premiumInterval;
    newSwap.totalPremiumRounds = _totalPremiumRounds;

    newSwap.seller.deposit = _sellerDeposit;

    return newSwapId;
  }

  function _acceptSwap(
    address _addr,
    uint256 _initAssetPrice,
    uint256 _acceptedSwapId
  ) internal returns (uint256) {
    Swap storage aSwap = _swaps[_acceptedSwapId];
    require(aSwap.status == Status.pending, 'The CDS is not pending state');

    aSwap.seller.addr = _addr;
    aSwap.initAssetPrice = _initAssetPrice;

    aSwap.seller.isDeposited = true;

    aSwap.buyer.lastPayDate = block.timestamp;
    aSwap.buyer.nextPayDate = block.timestamp + aSwap.premiumInterval;

    aSwap.status = Status.active;

    return _acceptedSwapId;
  }

  function _cancelSwap(uint256 _targetSwapId) internal returns (bool) {
    Swap storage cSwap = _swaps[_targetSwapId];
    require(msg.sender == cSwap.buyer.addr, 'Only buyer of the CDS can cancel');

    cSwap.status = Status.inactive;
    return true;
  }
}
