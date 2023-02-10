// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './Handler/AssetHandler.sol';

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
    uint256 initAssetPrice,
    uint256 swapId
  ) external returns (uint256);

  function cancel(uint256 swapId) external returns (bool);

  function close(uint256 swapId) external returns (bool);

  function claim(uint256 swapId) external returns (bool);

  function expire(uint256 swapId) external returns (bool);

  function payPremium(uint256 swapId) external returns (bool);

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

contract CDS is AssetHandler, CDSInterface {
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
    uint256 newSwapId = _create(
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
      address(getSwap(newSwapId))
    );
    return newSwapId;
  }

  function accept(
    uint256 initAssetPrice,
    uint256 swapId
  ) external override returns (uint256) {
    require(
      msg.sender != getBuyer(swapId) && msg.sender != getSeller(swapId),
      'The host can not call the method'
    );
    bool isSeller = (getSeller(swapId) == address(0));
    uint256 acceptedSwapId = _accept(isSeller, initAssetPrice, swapId);
    _sendDeposit(swapId, !isSeller);
    _sendFirstPremium(swapId);
    emit Accept(msg.sender, acceptedSwapId);
    return acceptedSwapId;
  }

  function cancel(
    uint256 swapId
  ) external override isParticipants(swapId) returns (bool) {
    _cancel(swapId);
    _endSwap(swapId);
    emit Cancel(swapId);
    return true;
  }

  function close(
    uint256 swapId
  ) external override isBuyer(swapId) returns (bool) {
    _close(swapId);
    _endSwap(swapId);
    emit Close(swapId);
    return true;
  }

  function claim(
    uint256 swapId
  ) external override isBuyer(swapId) returns (bool) {
    require(
      getSwap(swapId).getClaimReward() != 0,
      'Current price is higher than the claim price in CDS'
    );
    _claim(swapId);
    uint256 claimReward = _afterClaim(swapId);
    emit Claim(swapId, claimReward);
    return true;
  }

  // total Rounds 만료시 seller 콜 => 각자 deposit 가져가기. 근데 기간 만료인데 claimable 상태라면?
  // buyer Deposit = 0 인데, nextPayDate이 이미 지났을 경우 seller 콜 => 각자 deposit 가져가기
  function expire(uint256 swapId) external override returns (bool) {
    _expire(swapId);
    _endSwap(swapId);
    emit Expire(swapId);
    return true;
  }

  function payPremium(
    uint256 swapId
  ) external override isBuyer(swapId) returns (bool) {
    // require(
    //   token.allowance(getBuyer(swapId), address(this)) == getPremium(swapId),
    //   'Need allowance'
    // );
    _payPremium(swapId);
    _sendPremium(swapId);
    emit PayPremium(swapId);
    return true;
  }

  function payPremiumByDeposit(
    uint256 swapId
  ) external onlyOwner returns (bool) {
    _payPremium(swapId);
    _sendPremiumByDeposit(swapId);
    emit PayPremium(swapId);
    return true;
  }
}
