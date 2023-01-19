// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './priceOracleMock.sol';

contract PriceConsumer {
  PriceOracleMock private priceOracle;

  constructor() {}

  function getPriceFromOracle() public view returns (uint256) {
    uint256 result = priceOracle.getPrice();
    return result;
  }

  function setOracle(address _priceOracleAddress) public returns (bool) {
    require(_priceOracleAddress != address(0x0), 'Invalid address');
    priceOracle = PriceOracleMock(_priceOracleAddress);
    return true;
  }
}
