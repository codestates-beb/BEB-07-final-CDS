// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../Oracle/PriceOracleMock.sol';

contract PriceConsumer {
  PriceOracleMock private priceOracle;

  constructor() {
    priceOracle = PriceOracleMock(
      address(0xB35cB83eA5b247576bCAfE4298aC1211aA4c3BEe)
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
