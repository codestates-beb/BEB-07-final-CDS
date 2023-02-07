// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract AssetHandler is Ownable {
  using SafeMath for uint256;

  IERC20 public token;

  struct Deposit {
    uint256 deposit;
    bool isPaid;
  }

  mapping(uint256 => Deposit[2]) private _deposits;

  constructor() {
    token = IERC20(0xd9145CCE52D386f254917e481eB44e9943F39138);
  }

  function setToken(address _tokenAddress) external onlyOwner returns (bool) {
    require(_tokenAddress != address(0));
    token = IERC20(_tokenAddress);
    return true;
  }

  function _deposit(address sender, uint amount) public returns (bool) {
    token.transferFrom(sender, address(this), amount); // allowance[sender][CDS CA] = 0;
    return true;
  }

  function getDeposits(uint256 swapId) public view returns (Deposit[2] memory) {
    return _deposits[swapId];
  }

  function setSwapForBuyer(uint256 _swapId, uint256 _premium) internal {
    _deposits[_swapId][0].deposit = _premium.mul(3);
    _deposits[_swapId][0].isPaid = true;
  }

  function setSwapForSeller(uint256 _swapId, uint256 _sellerDeposit) internal {
    _deposits[_swapId][1].deposit = _sellerDeposit;
    _deposits[_swapId][1].isPaid = true;
  }

  function clearDeposit(uint256 swapId) internal {
    for (uint i = 0; i <= 1; i++) {
      _deposits[swapId][i].deposit = 0;
      _deposits[swapId][i].isPaid = false;
    }
  }

  // transferFrom 하면 premium 지불 시 마다 allowance가 줄어듦 => 매번 setPremium 매번 다시 세팅하면 되긴함;
}
