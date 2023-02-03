// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../Oracle/PriceConsumer.sol';
import '../libs/LibClaim.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract Swap is PriceConsumer, Ownable {
  using SafeMath for uint256;
  using LibClaim for uint256;

  enum Status {
    inactive,
    pending,
    active,
    claimed,
    expired
  }
  Status public status;

  address private buyer;
  address private seller;

  uint256 public initAssetPrice;
  uint256 public claimPrice;
  uint256 public liquidationPrice;
  uint256 public premium;
  uint256 public sellerDeposit;

  uint256 public interval;
  uint32 public rounds;

  constructor(
    uint256 _initAssetPrice,
    uint256 _claimPrice,
    uint256 _liquidationPrice,
    uint256 _premium,
    uint256 _sellerDeposit,
    uint256 _interval,
    uint32 _rounds
  ) {
    initAssetPrice = _initAssetPrice;
    claimPrice = _claimPrice;
    liquidationPrice = _liquidationPrice;
    premium = _premium;
    sellerDeposit = _sellerDeposit;
    interval = _interval;
    rounds = _rounds;

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

  function getClaimReward() public view returns (uint256) {
    uint256 currPrice = getPriceFromOracle();
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

  function getBuyer() public view returns (address) {
    return buyer;
  }

  function getSeller() public view returns (address) {
    return seller;
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
}
