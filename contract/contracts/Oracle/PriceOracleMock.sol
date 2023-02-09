// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract PriceOracleMock {
  uint256 public btcPrice;
  uint256 public ethPrice;
  uint256 public linkPrice;

  constructor(
    uint256 _initialBTCPrice,
    uint256 _initialETHPrice,
    uint256 _initialLinkPrice
  ) {
    btcPrice = _initialBTCPrice;
    ethPrice = _initialETHPrice;
    linkPrice = _initialLinkPrice;
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
