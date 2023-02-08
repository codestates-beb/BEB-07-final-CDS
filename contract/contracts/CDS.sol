// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './Handler/AssetHandler.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

interface CDSInterface {
  function create(
    bool isBuyer,
    uint256 initAssetPrice,
    uint256 claimPrice,
    uint256 liquidationPrice,
    uint256 sellerDeposit,
    uint256 premium,
    uint32 premiumInterval,
    uint32 totalRounds
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
    uint32 premiumInterval,
    uint32 totalRounds
  ) external override returns (uint256) {
    uint256 newSwapId = _create(
      isBuyer,
      initAssetPrice,
      claimPrice,
      liquidationPrice,
      sellerDeposit,
      premium,
      premiumInterval,
      totalRounds
    );
    _sendDeposit(newSwapId, isBuyer);
    emit Create(msg.sender, isBuyer, newSwapId, address(getSwap(newSwapId)));
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

  function cancel(uint256 swapId) external override returns (bool) {
    _cancel(swapId);
    _endSwap(swapId);
    emit Cancel(swapId);
    return true;
  }

  function close(uint256 swapId) external override returns (bool) {
    _close(swapId);
    _endSwap(swapId);
    emit Close(swapId);
    return true;
  }

  function claim(uint256 swapId) external override returns (bool) {
    require(
      getSwap(swapId).getClaimReward() != 0,
      'Claim price in CDS should be higher than current price of asset'
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

  function payPremium(uint256 swapId) external override returns (bool) {
    require(
      token.allowance(getBuyer(swapId), address(this)) == getPremium(swapId),
      'Need allowance'
    );
    _payPremium(swapId);
    bool sent = token.transferFrom(
      getBuyer(swapId),
      getSeller(swapId),
      getPremium(swapId)
    );
    require(sent, 'Sending premium failed');
    emit PayPremium(swapId);
    return true;
  }

  // called by server? seller?
  function payPremiumByDeposit(
    uint256 swapId
  ) external onlyOwner returns (bool) {
    _payPremium(swapId);
    return true;
  }
}
