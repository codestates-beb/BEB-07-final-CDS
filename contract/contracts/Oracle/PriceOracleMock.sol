// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract PriceOracleMock {
  uint256 price;

  constructor(uint256 _initialPrice) {
    price = _initialPrice;
  }

  function getPrice() public view returns (uint256) {
    return price;
  }

  function setPrice(uint256 _price) public returns (uint256) {
    price = _price;
    return price;
  }
}
