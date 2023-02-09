// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract PriceOracleMock {
  uint256 public btcPrice;
  uint256 public ethPrice;
  uint256 public xauPrice;

  constructor(uint256 _initialBTCPrice) {
    btcPrice = _initialBTCPrice;
  }

  function setBTCPrice(uint256 _price) public returns (uint256) {
    btcPrice = _price;
    return btcPrice;
  }

  function setETHPrice(uint256 _price) public returns (uint256) {
    ethPrice = _price;
    return btcPrice;
  }

  function setXAUPrice(uint256 _price) public returns (uint256) {
    xauPrice = _price;
    return btcPrice;
  }
}
