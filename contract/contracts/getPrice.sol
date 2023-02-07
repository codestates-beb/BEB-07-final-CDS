// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumer {
    AggregatorV3Interface internal priceFeed;
          
    struct PriceDetail {
        int Price;
        uint StartedAt;
        uint TimeStamp;
    }


     /**
     * Network: Goerli
     * Aggregator: BTC/USD
     * Address: 0xA39434A63A52E749F02807ae27335515BA4b07F7
     */

    constructor() {
        priceFeed = AggregatorV3Interface(
            0xA39434A63A52E749F02807ae27335515BA4b07F7
        );
    }

    /**
     * Returns the latest price
     */
    function getLatestPriceDetail() public view returns (PriceDetail memory) {
        (
            ,
            int price, 
            uint startedAt,
            uint timeStamp,
        ) = priceFeed.latestRoundData();

        PriceDetail memory priceDetail = PriceDetail({
            Price: price,
            StartedAt: startedAt,
            TimeStamp: timeStamp
        });

        return priceDetail;
    }

    function getLatestPrice() public view returns (uint256) {
        (
            ,
            int price, 
            ,
            ,
        ) = priceFeed.latestRoundData();

        return uint(price);
    }
}
