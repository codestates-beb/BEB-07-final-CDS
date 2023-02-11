// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './PriceConsumerGoerli.sol';
import '../libs/LibSwap.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract Swap is Ownable, PriceConsumerGoerli {
  using SafeMath for uint256;
  using LibSwap for uint256;

  enum Status {
    inactive,
    pending,
    active,
    claimed,
    expired
  }
  Status public status;

  uint256 public initAssetPrice;
  uint256 public claimPrice;
  uint256 public liquidationPrice;
  uint256 public premium;
  uint256 public sellerDeposit;
  uint256 public amountOfAsset;
  address private buyer;
  address private seller;
  uint32 public rounds;
  uint32 public totalRounds;
  uint32 public assetType;

  constructor(
    uint256 _initAssetPrice,
    uint256 _claimPrice,
    uint256 _liquidationPrice,
    uint256 _premium,
    uint256 _sellerDeposit,
    uint32 _rounds,
    uint32 _assetType
  ) {
    initAssetPrice = _initAssetPrice;
    claimPrice = _claimPrice;
    liquidationPrice = _liquidationPrice;
    premium = _premium;
    sellerDeposit = _sellerDeposit;
    rounds = _rounds;
    totalRounds = _rounds;
    amountOfAsset = initAssetPrice.calcAmountOfAsset(
      liquidationPrice,
      sellerDeposit
    );
    require(
      _assetType == 0 || _assetType == 1 || _assetType == 2,
      'BTC:0, ETH:1, LINK:2'
    );
    assetType = _assetType;

    buyer = address(0);
    seller = address(0);
    status = Status.pending;
  }

  function getPrices() public view returns (uint256[5] memory) {
    return [
      initAssetPrice,
      claimPrice,
      liquidationPrice,
      premium,
      sellerDeposit
    ];
  }

  function getBuyer() public view returns (address) {
    return buyer;
  }

  function getSeller() public view returns (address) {
    return seller;
  }

  function getClaimReward() public view returns (uint256) {
    uint256 currPrice = getCurrPrice();
    if (claimPrice < currPrice) {
      return 0;
    }
    return
      sellerDeposit.calcClaimReward(
        liquidationPrice,
        initAssetPrice,
        currPrice
      );
  }

  function setInitAssetPrice(uint256 _initAssetPrice) public returns (uint256) {
    initAssetPrice = _initAssetPrice;
    return initAssetPrice;
  }

  function setStatus(Status _status) public onlyOwner returns (Status) {
    status = _status;
    return status;
  }

  function setBuyer(address _buyer) public onlyOwner returns (address) {
    buyer = _buyer;
    return buyer;
  }

  function setSeller(address _seller) public onlyOwner returns (address) {
    seller = _seller;
    return seller;
  }

  function setRounds(uint32 _rounds) public onlyOwner returns (uint32) {
    rounds = _rounds;
    return rounds;
  }

  function getCurrPrice() private view returns (uint256) {
    if (assetType == 0) {
      return getBTCPrice().div(10 ** 8);
    } else if (assetType == 1) {
      return getETHPrice().div(10 ** 8);
    } else if (assetType == 2) {
      return getLinkPrice().div(10 ** 8);
    } else {
      return 0;
    }
  }
}
