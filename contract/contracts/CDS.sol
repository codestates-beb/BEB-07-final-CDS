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

    isBuyer
      ? setDepoForBuyer(newSwapId, premium)
      : setDepoForSeller(newSwapId, sellerDeposit);

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

    bool isBuyerHost = (getSeller(swapId) == address(0));
    isBuyerHost
      ? setDepoForSeller(swapId, getSellerDeposit(swapId))
      : setDepoForBuyer(swapId, getPremium(swapId));

    uint256 acceptedSwapId = _accept(isBuyerHost, initAssetPrice, swapId);
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
    uint256 claimReward = getClaimReward(swapId);
    require(
      claimReward != 0,
      'Claim price in CDS should be higher than current price of asset'
    );
    (bool sentBuyer, ) = msg.sender.call{
      value: (claimReward + getDeposits(swapId)[0].deposit)
    }('');
    (bool sentSeller, ) = msg.sender.call{
      value: (getDeposits(swapId)[1].deposit - claimReward)
    }('');
    require(sentBuyer && sentSeller, 'Sending reward failed');
    _claim(swapId);
    emit Claim(swapId, claimReward);
    return true;
  }

  function payPremium(uint256 swapId) external payable override returns (bool) {
    // date check
    // require(_checkDate(swapId), 'Invalid date');

    require(msg.value == getPremium(swapId), 'Invalid premium');
    (bool sent, ) = getSeller(swapId).call{value: msg.value}('');
    require(sent, 'Sending premium failed');
    // status update
    _payPremium(swapId);
    emit PayPremium(swapId);
    return true;
  }

  function getContractBalance() public view returns (uint256) {
    return address(this).balance;
  }

  // modifiers
  modifier isNotOwner() {
    require(msg.sender != owner(), 'Owner can not call the method');
    _;
  }
}
