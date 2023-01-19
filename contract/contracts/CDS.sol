// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './Swap/Swaps.sol';

contract CDS is Swaps {
  event MakeSwap(
    address indexed buyer,
    uint256 numBlocks,
    uint256 claimPrice,
    uint256 liquidationPrice,
    uint256 expirationMonth
  );

  function makeSwap(
    address _addr,
    uint256 _numBlocks,
    uint256 _claimRate,
    uint256 _liquidationRate,
    uint256 _expirationMonth
  ) public returns (uint256) {
    uint256 newSwapId = _makeSwap(
      _addr,
      _numBlocks,
      _claimRate,
      _liquidationRate,
      _expirationMonth
    );
    emit MakeSwap(
      _addr,
      _numBlocks,
      _claimRate,
      _liquidationRate,
      _expirationMonth
    );
    return newSwapId;
  }

  // function acceptSwap(address _addr) public returns (uint256) {
  // }

  function swap(uint256 swapId) public view returns (Swap memory) {
    return _swaps[swapId];
  }
}
