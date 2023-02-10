// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './SwapHandler.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract AssetHandler is SwapHandler {
  using SafeMath for uint256;

  IERC20 public token;

  mapping(uint256 => uint256[2]) public deposits;

  constructor() {
    token = IERC20(0x226f570b8554c04F34b64A7d903aB137F39C19be);
  }

  function _sendDeposit(
    uint256 _swapId,
    bool _isBuyer
  ) internal returns (bool) {
    uint256 deposit;
    if (_isBuyer) {
      deposit = getPremium(_swapId).mul(4);
      token.transferFrom(getBuyer(_swapId), address(this), deposit);
      deposits[_swapId][0] = deposit;
    } else {
      deposit = getSellerDeposit(_swapId);
      token.transferFrom(getSeller(_swapId), address(this), deposit);
      deposits[_swapId][1] = deposit;
    }
    return true;
  }

  function _sendFirstPremium(uint256 _swapId) internal returns (bool) {
    bool sent = token.transfer(getSeller(_swapId), getPremium(_swapId));
    require(sent, 'Sending first premium failed');
    deposits[_swapId][0] -= getPremium(_swapId);
    getSwap(_swapId).setRounds(getRounds(_swapId) - 1);
    return true;
  }

  function _endSwap(uint256 _swapId) internal returns (bool) {
    address[2] memory participants = [getBuyer(_swapId), getSeller(_swapId)];
    for (uint i = 0; i <= 1; i++) {
      uint256 deposit = deposits[_swapId][i];
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
    bool sentBuyer = token.transfer(
      getBuyer(_swapId),
      claimReward + deposits[_swapId][0]
    );
    bool sentSeller = token.transfer(
      getSeller(_swapId),
      deposits[_swapId][1] - claimReward
    );
    require(sentBuyer && sentSeller, 'Sending reward failed');
    clearDeposit(_swapId);
    return claimReward;
  }

  function _expire(
    uint256 _swapId
  ) internal isSeller(_swapId) isActive(_swapId) {
    bool byRounds = ((block.timestamp >= nextPayDate[_swapId]) &&
      (getRounds(_swapId) == 0));
    bool byDeposit = ((block.timestamp >= nextPayDate[_swapId]) &&
      (deposits[_swapId][0] == 0));
    require(byDeposit || byRounds, 'Buyer deposit / Rounds remaining');
    getSwap(_swapId).setStatus(Swap.Status.expired);
  }

  function _sendPremiumByDeposit(uint256 _swapId) internal {
    uint256 currTime = block.timestamp;
    require(
      (nextPayDate[_swapId] <= currTime),
      'Invalid date to pay premium by deposit '
    );
    require(deposits[_swapId][0] >= getPremium(_swapId), 'Not enough deposit');
    bool sent = token.transfer(getSeller(_swapId), getPremium(_swapId));
    require(sent, 'Sending premium failed');
    deposits[_swapId][0] -= getPremium(_swapId);
  }

  function _sendPremium(uint256 _swapId) internal {
    uint256 currTime = block.timestamp;
    require(
      (nextPayDate[_swapId] - 1 days <= currTime) &&
        (currTime <= nextPayDate[_swapId]),
      'Invalid date to pay premium'
    );
    bool sent = token.transferFrom(
      getBuyer(_swapId),
      getSeller(_swapId),
      getPremium(_swapId)
    );
    require(sent, 'Sending premium failed');
  }

  function clearDeposit(uint256 _swapId) private {
    for (uint i = 0; i <= 1; i++) {
      deposits[_swapId][i] = 0;
    }
  }
}
