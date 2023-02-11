// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './Handler/CDSAssets.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

interface CDSInterface {
  function create(
    bool isBuyer,
    uint256 initAssetPrice,
    uint256 claimPrice,
    uint256 liquidationPrice,
    uint256 sellerDeposit,
    uint256 premium,
    uint32 totalRounds,
    uint32 assetType
  ) external returns (uint256);

  function accept(
    uint256 swapId
  ) external returns (uint256);

  function cancel(uint256 swapId) external returns (bool);

  function close(uint256 swapId) external returns (bool);

  function claim(uint256 swapId) external returns (bool);

  function expire(uint256 swapId) external returns (bool);

  function payPremium(uint256 swapId) external returns (bool);

  function payPremiumByDeposit(
    uint256 swapId
  ) external returns (bool);

  function withdraw(uint256 amount) external returns (bool);

  event Create(
    address indexed hostAddr,
    bool isBuyer,
    uint256 swapId,
    uint32 assetType,
    address swap
  );
  event Accept(address indexed guestAddr, uint256 swapId);
  event Cancel(uint256 swapId);
  event Claim(uint256 swapId, uint256 claimReward);
  event Close(uint256 swapId);
  event Expire(uint256 swapId);
  event PayPremium(uint256 swapId);
}

contract CDS is CDSInterface, Ownable, CDSAssets {
  // transactions
  function create(
    bool isBuyer,
    uint256 initAssetPrice,
    uint256 claimPrice,
    uint256 liquidationPrice,
    uint256 sellerDeposit,
    uint256 premium,
    uint32 totalRounds,
    uint32 assetType
  ) external override returns (uint256) {
    uint256 newSwapId = swapFactory.create(
      isBuyer,
      initAssetPrice,
      claimPrice,
      liquidationPrice,
      sellerDeposit,
      premium,
      totalRounds,
      assetType
    );
    _sendDeposit(newSwapId, isBuyer);
    emit Create(
      msg.sender,
      isBuyer,
      newSwapId,
      assetType,
      address(swapFactory.getSwap(newSwapId))
    );
    return newSwapId;
  }

  function accept(
    uint256 swapId
  ) external override returns (uint256) {
    require(
      msg.sender != swapFactory.getBuyer(swapId) && msg.sender != swapFactory.getSeller(swapId),
      'The host can not call the method'
    );
    bool isSeller = (swapFactory.getSeller(swapId) == address(0));
    uint256 acceptedSwapId = swapFactory.accept(isSeller, swapId);
    _sendDeposit(swapId, !isSeller);
    _sendFirstPremium(swapId);
    emit Accept(msg.sender, acceptedSwapId);
    return acceptedSwapId;
  }

  function cancel(
    uint256 swapId
  ) external override isParticipants(swapId) returns (bool) {
    swapFactory.cancel(swapId);
    _endSwap(swapId);
    emit Cancel(swapId);
    return true;
  }

  function close(
    uint256 swapId
  ) external override isBuyer(swapId) returns (bool) {
    swapFactory.close(swapId);
    _endSwap(swapId);
    emit Close(swapId);
    return true;
  }

  function claim(
    uint256 swapId
  ) external override isBuyer(swapId) returns (bool) {
    require(
      swapFactory.getSwap(swapId).getClaimReward() != 0,
      'Current price is higher than the claim price in CDS'
    );
    swapFactory.claim(swapId);
    uint256 claimReward = _afterClaim(swapId);
    emit Claim(swapId, claimReward);
    return true;
  }

  function expire(uint256 swapId) external override returns (bool) {
    _expire(swapId);
    _endSwap(swapId);
    emit Expire(swapId);
    return true;
  }

  function payPremium(
    uint256 swapId
  ) external override isBuyer(swapId) returns (bool) {
    swapFactory.payPremium(swapId);
    _sendPremium(swapId);
    emit PayPremium(swapId);
    return true;
  }

  function payPremiumByDeposit(
    uint256 swapId
  ) external override onlyOwner returns (bool) {
    swapFactory.payPremium(swapId);
    _sendPremiumByDeposit(swapId);
    emit PayPremium(swapId);
    return true;
  }

  function withdraw(uint256 amount) external override onlyOwner returns (bool) {
    token.transfer(owner(), amount);
    return true;
  }
}
