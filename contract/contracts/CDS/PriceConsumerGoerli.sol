// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

contract PriceConsumerGoerli {
  AggregatorV3Interface private oracle;

  constructor(uint32 _assetType) {
    if (_assetType == 0) {
      oracle = AggregatorV3Interface(0xA39434A63A52E749F02807ae27335515BA4b07F7);
    } else if (_assetType == 1) {
      oracle = AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
    } else if (_assetType == 2) {
      oracle = AggregatorV3Interface(0x48731cF7e84dc94C5f84577882c14Be11a5B7456);
    }
  }

  /**
   * Returns the latest price
   */
  function getCurrPrice() public view returns (uint256) {
    (, int price, , , ) = oracle.latestRoundData();

    return uint(price);
  }
  
}
