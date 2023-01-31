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
    uint256 claimPrice;
    uint256 liquidationPrice;
    uint256 premium;
    uint256 premiumInterval;
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

  constructor() {}

  function _createSwap(
    bool _isBuyer,
    uint256 _initAssetPrice,
    uint256 _claimPrice,
    uint256 _liquidationPrice,
    uint256 _sellerDeposit,
    uint256 _premium,
    uint256 _premiumInterval
  ) internal returns (uint256) {
    _swapId.increment();
    uint256 newSwapId = _swapId.current();
    Swap storage newSwap = _swaps[newSwapId];

    newSwap.initAssetPrice = _initAssetPrice;
    newSwap.claimPrice = _claimPrice;
    newSwap.liquidationPrice = _liquidationPrice;
    newSwap.premium = _premium;
    newSwap.premiumInterval = _premiumInterval;
    newSwap.status = Status.pending;

    _isBuyer ? _createSwapByBuyer(newSwap) : _createSwapBySeller(newSwap);

    newSwap.seller.deposit = _sellerDeposit;

    return newSwapId;
  }

  function _createSwapByBuyer(Swap storage swap) private {
    swap.buyer.addr = msg.sender;
    swap.buyer.deposit = swap.premium.mul(3);
  }

  function _createSwapBySeller(Swap storage swap) private {
    swap.seller.addr = msg.sender;
    swap.seller.isDeposited = true;
  }

  function _acceptSwap(
    bool _isBuyerHost,
    uint256 _initAssetPrice,
    uint256 _acceptedSwapId
  ) internal returns (uint256) {
    Swap storage aSwap = _swaps[_acceptedSwapId];
    aSwap.initAssetPrice = _initAssetPrice;

    _isBuyerHost ? _createSwapBySeller(aSwap) : _createSwapByBuyer(aSwap);

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

  function getClaimReward(uint256 swapId) public view returns (uint256) {
    uint256 currPrice = getPriceFromOracle();
    Swap memory targetSwap = getSwap(swapId);
    if (targetSwap.claimPrice < currPrice) {
      return 0;
    }
    uint256 sellerDeposit = targetSwap.seller.deposit;
    uint256 claimReward = sellerDeposit.calcClaimReward(
      targetSwap.liquidationPrice,
      targetSwap.initAssetPrice,
      currPrice
    );
    return claimReward;
  }

  function getSwap(uint256 swapId) public view returns (Swap memory) {
    return _swaps[swapId];
  }

  function getBuyer(uint256 swapId) public view returns (Buyer memory) {
    return getSwap(swapId).buyer;
  }

  function getSeller(uint256 swapId) public view returns (Seller memory) {
    return getSwap(swapId).seller;
  }

  function getSwapId() public view returns (Counters.Counter memory) {
    return _swapId;
  }
}
