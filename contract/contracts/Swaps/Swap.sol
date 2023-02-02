// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../Oracle/PriceConsumer.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract Swap is PriceConsumer, Ownable {
  using SafeMath for uint256;

  enum Status {
    inactive,
    pending,
    active,
    claimed,
    expired
  }
  Status status;

  address buyer;
  address seller;

  uint256 initAssetPrice;
  uint256 claimPrice;
  uint256 liquidationPrice;
  uint256 premium;
  uint256 sellerDeposit;

  uint256 interval;
  uint32 rounds;

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

  function getDetail() public view returns (uint256[5] memory) {
    return [
      initAssetPrice,
      claimPrice,
      liquidationPrice,
      premium,
      sellerDeposit
    ];
  }

  function getStatus() public view returns (Status) {
    return status;
  }

  function getBuyer() public view returns (address) {
    return buyer;
  }

  function getSeller() public view returns (address) {
    return seller;
  }

  function getInterval() public view returns (uint256) {
    return interval;
  }

  function getRounds() public view returns (uint32) {
    return rounds;
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
}
