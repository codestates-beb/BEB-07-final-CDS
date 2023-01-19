// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/utils/math/SafeMath.sol';

library LibSwapCalc {
  using SafeMath for uint256;

  uint256 internal constant PERCENTAGE_BASE = 100;
  uint256 internal constant PREMIUM_RATE = 2;
  uint256 internal constant DEPOSIT_RATE = 3;

  function calcPrice(
    uint256 _price,
    uint256 _rate
  ) internal pure returns (uint256) {
    return _price.mul(PERCENTAGE_BASE.sub(_rate)).div(PERCENTAGE_BASE);
  }

  // function calcTotalClaimPrice(uint256 numBlocks, uint256 price, uint256 claimRate) internal pure returns (uint256) {
  //     uint256 totalAsset = numBlocks.mul(price);
  //     return totalAsset.mul(claimRate).div(PERCENTAGE_BASE);
  // }

  function calcTotalLiquidationPrice(
    uint256 _numBlocks,
    uint256 _price,
    uint256 _liquidationRate
  ) internal pure returns (uint256) {
    uint256 totalAsset = _numBlocks.mul(_price);
    return totalAsset.mul(_liquidationRate).div(PERCENTAGE_BASE);
  }

  function calcPremium(uint256 _claimPrice) internal pure returns (uint256) {
    return _claimPrice.mul(PREMIUM_RATE).div(PERCENTAGE_BASE);
  }

  function calcBuyerDepo(uint256 _premium) internal pure returns (uint256) {
    return _premium.mul(DEPOSIT_RATE);
  }
}
