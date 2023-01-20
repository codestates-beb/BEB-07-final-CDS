// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../Oracle/PriceConsumer.sol';
import '../libs/LibSwapCalc.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract Swaps is PriceConsumer {
  using Counters for Counters.Counter;
  using LibSwapCalc for uint256;
  Counters.Counter private _swapId;

  enum Status {
    pending,
    active,
    claimable,
    expired,
    liquidated
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
    uint256 claimPrice;
    uint256 liquidationPrice;
    uint256 premium;
    uint256 expirationMonth;
    Status status;
  }

  function _makeSwap(
    address _addr,
    uint256 _claimPrice,
    uint256 _liquidationPrice,
    uint256 _sellerDeposit,
    uint256 _premium,
    uint256 _expirationMonth
  ) internal returns (uint256) {
    _swapId.increment();
    uint256 newSwapId = _swapId.current();
    Swap storage newSwap = _swaps[newSwapId];

    newSwap.buyer.addr = _addr;

    newSwap.claimPrice = _claimPrice;
    newSwap.liquidationPrice = _liquidationPrice;
    newSwap.premium = _premium;
    newSwap.expirationMonth = _expirationMonth;

    newSwap.seller.deposit = _sellerDeposit;

    return newSwapId;
  }

  function _acceptSwap(address _addr, uint256 _acceptedSwapId)
    internal
    returns (uint256)
  {
    Swap storage aSwap = _swaps[_acceptedSwapId];

    aSwap.seller.addr = _addr;
    // seller deposit 이후
    aSwap.seller.isDeposited = true;

    // buyer deposit 이후
    uint256 buyerDeposit = aSwap.premium.calcBuyerDepo();
    aSwap.buyer.deposit = buyerDeposit;
    // buyer premium 납부 이후
    aSwap.buyer.lastPayDate = block.timestamp;
    aSwap.buyer.nextPayDate = block.timestamp + 4 weeks;

    aSwap.status = Status.active;

    return _acceptedSwapId;
  }
}
