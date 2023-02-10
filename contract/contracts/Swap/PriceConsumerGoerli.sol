// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

contract PriceConsumerV3 {
  mapping(uint => AggregatorV3Interface) private _aggregators;

  constructor() {
    _aggregators[0] = AggregatorV3Interface(
      0xA39434A63A52E749F02807ae27335515BA4b07F7
    );
    _aggregators[1] = AggregatorV3Interface(
      0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
    );
    _aggregators[2] = AggregatorV3Interface(
      0x48731cF7e84dc94C5f84577882c14Be11a5B7456
    );
  }

  /**
   * Returns the latest price
   */
  function getBTCPrice() public view returns (uint256) {
    (, int price, , , ) = _aggregators[0].latestRoundData();

    return uint(price);
  }

  function getETHPrice() public view returns (uint256) {
    (, int price, , , ) = _aggregators[1].latestRoundData();

    return uint(price);
  }

  function getLinkPrice() public view returns (uint256) {
    (, int price, , , ) = _aggregators[2].latestRoundData();

    return uint(price);
  }
}
