// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './Swaps/Swap.sol';
import './libs/LibClaim.sol';
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

    // newSwap.setStatusPending();

    _isBuyer ? _createSwapByBuyer(newSwapId) : _createSwapBySeller(newSwapId);

    return newSwapId;
  }

  function getSwapId() public view returns (Counters.Counter memory) {
    return _swapId;
  }

  function getSwap(uint256 swapId) public view returns (Swap) {
    return _swaps[swapId];
  }

  function getPriceDetail(
    uint256 swapId
  ) public view returns (uint256[5] memory) {
    return _swaps[swapId].getDetail();
  }

  function getSwapStatus(uint256 swapId) public view returns (Swap.Status) {
    return _swaps[swapId].getStatus();
  }

  function getRoundsLeft(uint256 swapId) public view returns (uint32) {
    return _swaps[swapId].getRounds();
  }

  function getInterval(uint256 swapId) public view returns (uint256) {
    return _swaps[swapId].getInterval();
  }

  function getBuyer(uint256 swapId) public view returns (address) {
    return _swaps[swapId].getBuyer();
  }

  function getSeller(uint256 swapId) public view returns (address) {
    return _swaps[swapId].getSeller();
  }

  function _createSwapByBuyer(uint256 swapId) private {
    _swaps[swapId].setBuyer(msg.sender);
    _deposits[swapId][0].deposit = getPriceDetail(swapId)[3].mul(3);
    _deposits[swapId][0].isPaid = true;
  }

  function _createSwapBySeller(uint256 swapId) private {
    _swaps[swapId].setSeller(msg.sender);
    _deposits[swapId][1].deposit = getPriceDetail(swapId)[4];
    _deposits[swapId][1].isPaid = true;
  }

  function _clearDeposit(uint256 swapId) private {
    for (uint i = 0; i <= 1; i++) {
      _deposits[swapId][i].deposit = 0;
      _deposits[swapId][i].isPaid = false;
    }
  }
}
