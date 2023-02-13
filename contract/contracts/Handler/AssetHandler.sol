// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './Swaps.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract AssetHandler {
  using SafeMath for uint256;

  IERC20 public token;
  Swaps internal swaps;

  mapping(uint256 => uint256[2]) public deposits;

  constructor() {
    token = IERC20(0x5261b29054bA8fEdFfaa743C584120724Eb1cC7e);
    swaps = Swaps(0x712F138Bb2401b654aE9B3824047dCB6F6FFCD0C);
  }

  function _sendDeposit(
    uint256 _swapId,
    bool _isBuyer
  ) internal returns (bool) {
    uint256 deposit;
    if (_isBuyer) {
      deposit = swaps.getPremium(_swapId).mul(4);
      token.transferFrom(swaps.getBuyer(_swapId), address(this), deposit);
      deposits[_swapId][0] = deposit;
    } else {
      deposit = swaps.getSellerDeposit(_swapId);
      token.transferFrom(swaps.getSeller(_swapId), address(this), deposit);
      deposits[_swapId][1] = deposit;
    }
    return true;
  }

  function _sendFirstPremium(uint256 _swapId) internal returns (bool) {
    bool sent = token.transfer(swaps.getSeller(_swapId), swaps.getPremium(_swapId));
    require(sent, 'Sending first premium failed');
    deposits[_swapId][0] -= swaps.getPremium(_swapId);
    swaps.getSwap(_swapId).setRounds(swaps.getRounds(_swapId) - 1);
    return true;
  }

  function _endSwap(uint256 _swapId) internal returns (bool) {
    address[2] memory participants = [swaps.getBuyer(_swapId), swaps.getSeller(_swapId)];
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
    uint256 claimReward = swaps.getSwap(_swapId).getClaimReward();
    bool sentBuyer = token.transfer(
      swaps.getBuyer(_swapId),
      claimReward + deposits[_swapId][0]
    );
    bool sentSeller = token.transfer(
      swaps.getSeller(_swapId),
      deposits[_swapId][1] - claimReward
    );
    require(sentBuyer && sentSeller, 'Sending reward failed');
    clearDeposit(_swapId);
    return claimReward;
  }

// expire need isActive
  function _expire(
    uint256 _swapId
  ) internal isSeller(_swapId) {
    require(
      swaps.getStatus(_swapId) == Swap.Status.active,
      'The status of the CDS should be active'
    );
    bool byRounds = ((block.timestamp >= swaps.getNextPayDate(_swapId)) &&
      (swaps.getRounds(_swapId) == 0));
    bool byDeposit = ((block.timestamp >= swaps.getNextPayDate(_swapId)) &&
      (deposits[_swapId][0] == 0));
    // bool byRounds = (getRounds(_swapId) == 0);
    // bool byDeposit = (deposits[_swapId][0] == 0);
    require(byDeposit || byRounds, 'Buyer deposit / Rounds remaining');
    swaps.getSwap(_swapId).setStatus(Swap.Status.expired);
  }

  function _sendPremiumByDeposit(uint256 _swapId) internal {
    uint256 currTime = block.timestamp;
    require(
      (swaps.getNextPayDate(_swapId) <= currTime),
      'Invalid date to pay premium by deposit '
    );
    require(deposits[_swapId][0] >= swaps.getPremium(_swapId), 'Not enough deposit');
    bool sent = token.transfer(swaps.getSeller(_swapId), swaps.getPremium(_swapId));
    require(sent, 'Sending premium failed');
    deposits[_swapId][0] -= swaps.getPremium(_swapId);
  }

  function _sendPremium(uint256 _swapId) internal {
    uint256 currTime = block.timestamp;
    require(
      (swaps.getNextPayDate(_swapId) - 3 days <= currTime) &&
        (currTime <= swaps.getNextPayDate(_swapId)),
      'Invalid date to pay premium'
    );
    bool sent = token.transferFrom(
      swaps.getBuyer(_swapId),
      swaps.getSeller(_swapId),
      swaps.getPremium(_swapId)
    );
    require(sent, 'Sending premium failed');
  }

  function clearDeposit(uint256 _swapId) private {
    for (uint i = 0; i <= 1; i++) {
      deposits[_swapId][i] = 0;
    }
  }

  modifier isBuyer(uint256 swapId) {
    require(msg.sender == swaps.getBuyer(swapId), 'Only buyer of the CDS can call');
    _;
  }

  modifier isSeller(uint256 swapId) {
    require(msg.sender == swaps.getSeller(swapId), 'Only seller of the CDS can call');
    _;
  }

  modifier isParticipants(uint256 swapId) {
    require(
      msg.sender == swaps.getBuyer(swapId) || msg.sender == swaps.getSeller(swapId),
      'Only buyer/seller of the CDS can call'
    );
    _;
  }
}
