// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract PriceOracleMock {
  uint256 public btcPrice;
  uint256 public ethPrice;
  uint256 public linkPrice;

  constructor(
  ) {
    btcPrice = 2500000000000;
    ethPrice = 160000000000;
    linkPrice = 750000000;
  }

  function setBTCPrice(uint256 _price) public returns (uint256) {
    btcPrice = _price;
    return btcPrice;
  }

  function setETHPrice(uint256 _price) public returns (uint256) {
    ethPrice = _price;
    return ethPrice;
  }

  function setLinkPrice(uint256 _price) public returns (uint256) {
    linkPrice = _price;
    return linkPrice;
  }
}
