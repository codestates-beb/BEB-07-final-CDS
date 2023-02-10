// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../Oracle/PriceOracleMock.sol';

contract PriceConsumer {
  PriceOracleMock private priceOracle;

  constructor() {
    priceOracle = PriceOracleMock(
      address(0x63AeE035a950875179befa3d298948B0F6061AcF)
    );
  }

  function getBTCPrice() public view returns (uint256) {
    uint256 price = priceOracle.btcPrice();
    return price;
  }

  function getETHPrice() public view returns (uint256) {
    uint256 price = priceOracle.ethPrice();
    return price;
  }

  function getLinkPrice() public view returns (uint256) {
    uint256 price = priceOracle.linkPrice();
    return price;
  }
}
