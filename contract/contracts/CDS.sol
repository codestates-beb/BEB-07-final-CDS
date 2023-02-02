// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './Handler/SwapHandler.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract CDS is Ownable, SwapHandler {
  using SafeMath for uint256;

  constructor() payable {}

  receive() external payable {}

  // events
  event CreateSwap(
    address indexed hostAddr,
    bool isBuyer,
    uint256 swapId,
    address swap
  );
  event AcceptSwap(address indexed guestAddr, uint256 swapId);
  event CancelSwap(uint256 swapId);
  event ClaimSwap(uint256 swapId, uint256 claimReward);
  event CloseSwap(uint256 swapId);

  // transactions
  function createSwap(
    bool isBuyer,
    uint256 initAssetPrice,
    uint256 claimPrice,
    uint256 liquidationPrice,
    uint256 sellerDeposit,
    uint256 premium,
    uint32 premiumInterval,
    uint32 totalRounds
  ) external payable isNotOwner returns (uint256) {
    uint256 buyerDeposit = premium.mul(3) * 1 wei;
    isBuyer ? _sendDeposit(buyerDeposit) : _sendDeposit(sellerDeposit);

    uint256 newSwapId = _createSwap(
      isBuyer,
      initAssetPrice,
      claimPrice,
      liquidationPrice,
      sellerDeposit,
      premium,
      premiumInterval,
      totalRounds
    );
    emit CreateSwap(
      msg.sender,
      isBuyer,
      newSwapId,
      address(getSwap(newSwapId))
    );
    return newSwapId;
  }

  function acceptSwap(
    uint256 initAssetPrice,
    uint256 swapId
  ) external payable isNotOwner isPending(swapId) returns (uint256) {
    require(
      msg.sender != getBuyer(swapId) && msg.sender != getSeller(swapId),
      'The host can not call the method'
    );

    bool isBuyerHost = (getSeller(swapId) == address(0));

    isBuyerHost
      ? _sendDeposit(getPriceDetail(swapId)[4])
      : _sendDeposit(getPriceDetail(swapId)[3].mul(3));

    uint256 acceptedSwapId = _acceptSwap(isBuyerHost, initAssetPrice, swapId);
    emit AcceptSwap(msg.sender, acceptedSwapId);
    return acceptedSwapId;
  }

  function cancelSwap(
    uint256 swapId
  )
    external
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
    _cancelSwap(swapId);
    emit CancelSwap(swapId);
    return sent;
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
