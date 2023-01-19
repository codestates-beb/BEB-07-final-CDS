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
    uint lastPayDate;
    uint nextPayDate;
  }

  struct Seller {
    address addr;
    uint256 deposit;
    bool isDeposited;
  }

  struct Swap {
    Buyer buyer;
    Seller seller;
    uint256 numBlocks;
    uint256 priceOfAsset;
    uint256 claimPrice;
    uint256 liquidationPrice;
    uint256 premium;
    uint256 expirationMonth;
    Status status;
  }

  function _makeSwap(
    address _addr,
    uint256 _numBlocks,
    uint256 _claimRate,
    uint256 _liquidationRate,
    uint256 _expirationMonth
  ) internal returns (uint256) {
    _swapId.increment();
    uint256 newSwapId = _swapId.current();

    _swaps[newSwapId].buyer.addr = _addr;
    _swaps[newSwapId].numBlocks = _numBlocks;

    uint256 _priceOfAsset = getPriceFromOracle();
    _swaps[newSwapId].priceOfAsset = _priceOfAsset;

    uint256 _claimPrice = _priceOfAsset.calcPrice(_claimRate);
    _swaps[newSwapId].claimPrice = _claimPrice;
    uint256 _liquidationPrice = _priceOfAsset.calcPrice(_liquidationRate);
    _swaps[newSwapId].liquidationPrice = _liquidationPrice;
    uint256 _premium = _claimPrice.calcPremium();
    _swaps[newSwapId].premium = _premium;

    _swaps[newSwapId].expirationMonth = _expirationMonth;

    uint256 _sellerDeposit = _numBlocks.calcTotalLiquidationPrice(
      _priceOfAsset,
      _liquidationRate
    );
    _swaps[newSwapId].seller.deposit = _sellerDeposit;

    return newSwapId;
  }

  // function _offerSwap(uint256 _offerSwapId) {}

  // function _acceptSwap(address _addr, uint256 _acceptedSwapId) public returns (uint256) {
  //     _swaps[_acceptedSwapId].seller.addr = _addr;

  //     _swaps[_acceptedSwapId].status = Status.active;
  //     return _acceptedSwapId;
  // }
}
