// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../Oracle/PriceOracleMock.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';


contract PriceConsumer {
  using SafeMath for uint256;

  PriceOracleMock private priceOracle;

  constructor(address _address) {
    priceOracle = PriceOracleMock(_address);
  }

  function getCurrPrice(uint32 _assetType) public view returns (uint256) {
    uint256 price;
    if (_assetType == 0) {
      price = priceOracle.btcPrice().div(10 ** 8);
    } else if (_assetType == 1) {
      price = priceOracle.ethPrice().div(10 ** 8);
    } else if (_assetType == 2) {
      price = priceOracle.linkPrice().div(10 ** 8);
    }
    return price;
  }
}
