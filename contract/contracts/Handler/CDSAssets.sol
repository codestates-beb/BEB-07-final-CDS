// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../Swaps/SwapFactory.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract CDSAssets {
  using SafeMath for uint256;
  SwapFactory internal swapFactory;

  IERC20 public token;

  mapping(uint256 => uint256[2]) public deposits;

  constructor() {
    token = IERC20(0xC2B7A205E30A3868EF2ce35A49b67adf1c077922);
    swapFactory = SwapFactory(0x43b4CF0D87d3f7874be5382B4b5f553A26F0ce40);
  }

  function _sendDeposit(
    uint256 _swapId,
    bool _isBuyer
  ) internal returns (bool) {
    uint256 deposit;
    if (_isBuyer) {
      deposit = swapFactory.getPremium(_swapId).mul(4);
      token.transferFrom(swapFactory.getBuyer(_swapId), address(this), deposit);
      deposits[_swapId][0] = deposit;
    } else {
      deposit = swapFactory.getSellerDeposit(_swapId);
      token.transferFrom(swapFactory.getSeller(_swapId), address(this), deposit);
      deposits[_swapId][1] = deposit;
    }
    return true;
  }

  function _sendFirstPremium(uint256 _swapId) internal returns (bool) {
    bool sent = token.transfer(swapFactory.getSeller(_swapId), swapFactory.getPremium(_swapId));
    require(sent, 'Sending first premium failed');
    deposits[_swapId][0] -= swapFactory.getPremium(_swapId);
    swapFactory.getSwap(_swapId).setRounds(swapFactory.getRounds(_swapId) - 1);
    return true;
  }

  function _endSwap(uint256 _swapId) internal returns (bool) {
    address[2] memory participants = [swapFactory.getBuyer(_swapId), swapFactory.getSeller(_swapId)];
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
    uint256 claimReward = swapFactory.getSwap(_swapId).getClaimReward();
    bool sentBuyer = token.transfer(
      swapFactory.getBuyer(_swapId),
      claimReward + deposits[_swapId][0]
    );
    bool sentSeller = token.transfer(
      swapFactory.getSeller(_swapId),
      deposits[_swapId][1] - claimReward
    );
    require(sentBuyer && sentSeller, 'Sending reward failed');
    clearDeposit(_swapId);
    return claimReward;
  }

  function _expire(
    uint256 _swapId
  ) internal isSeller(_swapId) {
    require(
      swapFactory.getStatus(_swapId) == Swap.Status.active,
      'The status of the CDS should be active'
    );
    bool byRounds = ((block.timestamp >= swapFactory.nextPayDate(_swapId)) &&
      (swapFactory.getRounds(_swapId) == 0));
    bool byDeposit = ((block.timestamp >= swapFactory.nextPayDate(_swapId)) &&
      (deposits[_swapId][0] == 0));
    require(byDeposit || byRounds, 'Buyer deposit / Rounds remaining');
    swapFactory.getSwap(_swapId).setStatus(Swap.Status.expired);
  }

  function _sendPremiumByDeposit(uint256 _swapId) internal {
    uint256 currTime = block.timestamp;
    require(
      (swapFactory.nextPayDate(_swapId) <= currTime),
      'Invalid date to pay premium by deposit '
    );
    require(deposits[_swapId][0] >= swapFactory.getPremium(_swapId), 'Not enough deposit');
    bool sent = token.transfer(swapFactory.getSeller(_swapId), swapFactory.getPremium(_swapId));
    require(sent, 'Sending premium failed');
    deposits[_swapId][0] -= swapFactory.getPremium(_swapId);
  }

  function _sendPremium(uint256 _swapId) internal {
    uint256 currTime = block.timestamp;
    require(
      (swapFactory.nextPayDate(_swapId) - 3 days <= currTime) &&
        (currTime <= swapFactory.nextPayDate(_swapId)),
      'Invalid date to pay premium'
    );
    bool sent = token.transferFrom(
      swapFactory.getBuyer(_swapId),
      swapFactory.getSeller(_swapId),
      swapFactory.getPremium(_swapId)
    );
    require(sent, 'Sending premium failed');
  }

  function clearDeposit(uint256 _swapId) private {
    for (uint i = 0; i <= 1; i++) {
      deposits[_swapId][i] = 0;
    }
  }

  // modifiers
  modifier isBuyer(uint256 swapId) {
    require(msg.sender == swapFactory.getBuyer(swapId), 'Only buyer of the CDS can call');
    _;
  }

  modifier isSeller(uint256 swapId) {
    require(msg.sender == swapFactory.getSeller(swapId), 'Only seller of the CDS can call');
    _;
  }

  modifier isParticipants(uint256 swapId) {
    require(
      msg.sender == swapFactory.getBuyer(swapId) || msg.sender == swapFactory.getSeller(swapId),
      'Only buyer/seller of the CDS can call'
    );
    _;
  }
  
}
