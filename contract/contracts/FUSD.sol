// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract FUSD is ERC20('FUSD', 'FUSD') {
  constructor() {
    // Mint 100 tokens to msg.sender
    // Similar to how
    // 1 dollar = 100 cents
    // 1 token = 1 * (10 ** decimals)
    _mint(msg.sender, 100 * 10 ** uint256(decimals()));
  }
}
