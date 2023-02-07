// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './Handler/SwapHandler.sol';
import './Handler/AssetHandler.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
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
  ) external payable returns (uint256);

  function accept(
    uint256 initAssetPrice,
    uint256 swapId
  ) external payable returns (uint256);

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

contract CDS is CDSInterface, Ownable, SwapHandler, AssetHandler {
  using SafeMath for uint256;

  constructor() payable {}

  receive() external payable {}

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
  ) external payable override isNotOwner returns (uint256) {
    uint256 buyerDeposit = premium.mul(3) * 1 wei;

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

    if (isBuyer) {
      _sendDeposit(buyerDeposit);
      setSwapForBuyer(newSwapId, premium);
    } else {
      _sendDeposit(sellerDeposit);
      setSwapForSeller(newSwapId, sellerDeposit);
    }

    emit Create(msg.sender, isBuyer, newSwapId, address(getSwap(newSwapId)));
    return newSwapId;
  }

  function accept(
    uint256 initAssetPrice,
    uint256 swapId
  ) external payable override isNotOwner isPending(swapId) returns (uint256) {
    require(
      msg.sender != getBuyer(swapId) && msg.sender != getSeller(swapId),
      'The host can not call the method'
    );

    bool isBuyerHost = (getSeller(swapId) == address(0));

    if (isBuyerHost) {
      _sendDeposit(getSellerDeposit(swapId));
      setSwapForSeller(swapId, getSellerDeposit(swapId));
    } else {
      _sendDeposit(getPremium(swapId).mul(3));
      setSwapForBuyer(swapId, getPremium(swapId));
    }

    uint256 acceptedSwapId = _accept(isBuyerHost, initAssetPrice, swapId);
    emit Accept(msg.sender, acceptedSwapId);
    return acceptedSwapId;
  }

  function cancel(
    uint256 swapId
  )
    external
    override
    isNotOwner
    isParticipants(swapId)
    isPending(swapId)
    returns (bool)
  {
    uint256 deposit;
    (msg.sender == getBuyer(swapId))
      ? deposit = getDeposits(swapId)[0].deposit
      : deposit = getDeposits(swapId)[1].deposit;
    (bool sent, ) = msg.sender.call{value: deposit}('');
    require(sent, 'Sending failed');
    _cancel(swapId);
    emit Cancel(swapId);
    return sent;
  }

  function close(
    uint256 swapId
  ) external override isBuyer(swapId) isActive(swapId) returns (bool) {
    // 어짜피 sent관련은 토큰 적용시 없어짐.
    bool sentBuyer = true;
    if (getDeposits(swapId)[0].deposit != 0) {
      (sentBuyer, ) = msg.sender.call{value: getDeposits(swapId)[0].deposit}(
        ''
      );
    }
    (bool sentSeller, ) = getSeller(swapId).call{
      value: getDeposits(swapId)[1].deposit
    }('');
    require(sentBuyer && sentSeller, 'Sending deposit failed');
    _close(swapId);
    emit Close(swapId);
    return true;
  }

  function payPremium(
    uint256 swapId
  ) external payable override isBuyer(swapId) isActive(swapId) returns (bool) {
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

  function claim(
    uint256 swapId
  )
    external
    override
    isNotOwner
    isBuyer(swapId)
    isActive(swapId)
    returns (bool)
  {
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

  function _sendDeposit(uint256 deposit) public payable returns (bool) {
    require(deposit == msg.value, 'Invalid eth amount');
    (bool sent, ) = payable(address(this)).call{value: msg.value}('');
    require(sent, 'Sending deposit failed');
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
