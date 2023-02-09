// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../Oracle/PriceOracleMock.sol';

contract PriceConsumer {
  PriceOracleMock private priceOracle;

  constructor() {
    priceOracle = PriceOracleMock(
      address(0xe4e0859B42D578B3C8F69EAC10D21b2dF6ef2963) // 바꿔야함
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
