// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './Handler/AssetHandler.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
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

  function payPremium(uint256 swapId) external payable returns (bool);

  function expireByRounds(uint256 swapId) external returns (bool);

  function expireByDate(uint256 swapId) external returns (bool);

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

contract CDS is Ownable, AssetHandler, CDSInterface {
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
  ) external override isNotOwner returns (uint256) {
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
    _afterDeposit(newSwapId, isBuyer);
    emit Create(msg.sender, isBuyer, newSwapId, address(getSwap(newSwapId)));
    return newSwapId;
  }

  function accept(
    uint256 initAssetPrice,
    uint256 swapId
  ) external override isNotOwner returns (uint256) {
    require(
      msg.sender != getBuyer(swapId) && msg.sender != getSeller(swapId),
      'The host can not call the method'
    );

    bool isSeller = (getSeller(swapId) == address(0)); 
    uint256 acceptedSwapId = _accept(isSeller, initAssetPrice, swapId);
    _afterDeposit(swapId, !isSeller);
    emit Accept(msg.sender, acceptedSwapId);
    return acceptedSwapId;
  }

  function cancel(uint256 swapId) external override returns (bool) {
    _cancel(swapId);
    _afterCancel(swapId);
    emit Cancel(swapId);
    return true;
  }

  function close(uint256 swapId) external override returns (bool) {
    _close(swapId);
    _afterClose(swapId);
    emit Close(swapId);
    return true;
  }

  function claim(uint256 swapId) external override returns (bool) {
    _claim(swapId);
    uint256 claimReward = _afterClaim(swapId);
    emit Claim(swapId, claimReward);
    return true;
  }

  // total Rounds 만료시 seller 콜 => 각자 deposit 가져가기. 근데 기간 만료인데 claimable 상태라면?
  function expireByRounds(uint256 swapId) external override returns (bool) {
    _expireByRounds(swapId);
    _afterClose(swapId);
    emit Expire(swapId);
    return true;
  }

  // buyer Deposit = 0 인데, nextPayDate이 이미 지났을 경우 seller 콜 => 각자 deposit 가져가기
  function expireByDate(uint256 swapId) external override returns (bool) {
    _expireByDate(swapId);
    _afterClose(swapId);
    emit Expire(swapId);
    return true;
  }

// approve 받았다고 가정.
  function payPremium(uint256 swapId) external payable override returns (bool) {
    require(msg.value == getPremium(swapId), 'Invalid premium');
    (bool sent, ) = getSeller(swapId).call{value: msg.value}('');
    require(sent, 'Sending premium failed');
    // status update
    _payPremium(swapId);
    emit PayPremium(swapId);
    return true;
  }

  // modifiers
  modifier isNotOwner() {
    require(msg.sender != owner(), 'Owner can not call the method');
    _;
  }
}
