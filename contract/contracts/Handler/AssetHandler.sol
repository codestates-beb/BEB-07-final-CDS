// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './SwapHandler.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract AssetHandler is Ownable, SwapHandler {
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

  function _afterCancel(uint256 _swapId) internal returns (bool) {
    uint256 deposit;
    bool isBuyer = (msg.sender == getBuyer(_swapId));
    isBuyer ? deposit = getDeposits(_swapId)[0].deposit : getDeposits(_swapId)[1].deposit;
    bool sent = token.transfer(msg.sender, deposit);
    require(sent, 'Sending deposit failed');
    clearDeposit(_swapId);
    return true;
  }

  function _afterClose(uint256 _swapId) internal returns (bool) {
    uint256 buyerDeposit = getDeposits(_swapId)[0].deposit;
    uint256 sellerDeposit = getDeposits(_swapId)[1].deposit;
    bool buyerSent = token.transfer(getBuyer(_swapId), buyerDeposit);
    bool sellerSent = token.transfer(getSeller(_swapId), sellerDeposit);
    require(buyerSent && sellerSent, 'Sending deposit failed');
    clearDeposit(_swapId);
    return true;
  }

  function setDepoForBuyer(uint256 _swapId, uint256 _premium) internal {
    _deposits[_swapId][0].deposit = _premium.mul(3);
    _deposits[_swapId][0].isPaid = true;
  }

  function setDepoForSeller(uint256 _swapId, uint256 _sellerDeposit) internal {
    _deposits[_swapId][1].deposit = _sellerDeposit;
    _deposits[_swapId][1].isPaid = true;
  }

  function clearDeposit(uint256 swapId) private {
    for (uint i = 0; i <= 1; i++) {
      _deposits[swapId][i].deposit = 0;
      _deposits[swapId][i].isPaid = false;
    }
  }
}
