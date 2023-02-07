// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './SwapHandler.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract AssetHandler is Ownable, SwapHandler {
  using SafeMath for uint256;

  IERC20 public token;

  mapping(uint256 => uint256[2]) private _deposits;

  constructor() {
    token = IERC20(0xd9145CCE52D386f254917e481eB44e9943F39138);
  }

  function setToken(address _tokenAddress) external onlyOwner returns (bool) {
    require(_tokenAddress != address(0));
    token = IERC20(_tokenAddress);
    return true;
  }

  function getDeposits(uint256 swapId) public view returns (uint256[2] memory) {
    return _deposits[swapId];
  }

  function _afterDeposit(
    uint256 _swapId,
    bool _isBuyer
  ) internal returns (bool) {
    _isBuyer
      ? _deposits[_swapId][0] = getPremium(_swapId).mul(4)
      : _deposits[_swapId][1] = getSellerDeposit(_swapId);
    return true;
  }

  function _firstPremium(uint256 _swapId) internal returns (bool) {
    bool sent = token.transfer(getSeller(_swapId), getPremium(_swapId));
    require(sent, 'Sending first premium failed');
    _deposits[_swapId][0] -= getPremium(_swapId);
    return true;
  }

  function _endSwap(uint256 _swapId) internal returns (bool) {
    address[2] memory participants = [getBuyer(_swapId), getSeller(_swapId)];
    for (uint i = 0; i <= 1; i++) {
      uint256 deposit = getDeposits(_swapId)[i];
      if (deposit != 0) {
        bool sent = token.transfer(participants[i], deposit);
        require(sent, 'Sending deposit back failed');
      }
    }
    clearDeposit(_swapId);
    return true;
  }

  function _afterClaim(uint256 _swapId) internal returns (uint256) {
    uint256 claimReward = getSwap(_swapId).getClaimReward();
    require(
      claimReward != 0,
      'Claim price in CDS should be higher than current price of asset'
    );
    bool sentBuyer = token.transfer(
      getBuyer(_swapId),
      claimReward + getDeposits(_swapId)[0]
    );
    bool sentSeller = token.transfer(
      getSeller(_swapId),
      getDeposits(_swapId)[1] - claimReward
    );
    require(sentBuyer && sentSeller, 'Sending reward failed');
    clearDeposit(_swapId);
    return claimReward;
  }

  function _afterPayPremium(uint256 _swapId) internal returns (bool) {
    bool sent = token.transferFrom(
      msg.sender,
      getSeller(_swapId),
      getPremium(_swapId)
    );
    require(sent, 'Sending premium failed');
    return true;
  }

  function _expire(
    uint256 _swapId
  ) internal isSeller(_swapId) isActive(_swapId) {
    bool byRounds = ((block.timestamp >= getNextPayDate(_swapId)) &&
      (getTotalRounds(_swapId) == 0));
    bool byDate = ((block.timestamp >= getNextPayDate(_swapId)) &&
      (getDeposits(_swapId)[0] == 0));
    require(byDate || byRounds, 'Buyer deposit / Rounds remaining');
    getSwap(_swapId).setStatus(Swap.Status.expired);
  }

  function clearDeposit(uint256 swapId) private {
    for (uint i = 0; i <= 1; i++) {
      _deposits[swapId][i] = 0;
    }
  }
}
