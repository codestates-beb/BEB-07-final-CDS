// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './Swaps/Swaps.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import './libs/LibClaim.sol';

contract CDS is Swaps, Ownable {
  using SafeMath for uint256;
  using LibClaim for uint256;

  constructor() payable {}

  receive() external payable {}

  modifier isNotOwner() {
    require(msg.sender != owner(), 'Owner can not call the method');
    _;
  }

  event CreateSwap(
    address indexed hostAddr,
    bool isBuyer,
    uint256 swapId,
    uint256 initAssetPrice,
    uint256 amountOfAssets,
    uint256 claimPrice,
    uint256 liquidationPrice,
    uint256 premium,
    uint256 premiumRate,
    uint256 premiumInterval,
    uint256 totalPremiumRounds,
    uint256 buyerDeposit
  );
  event AcceptSwap(
    address indexed seller,
    uint256 swapId,
    uint256 sellerDeposit
  );
  event CancelSwap(uint256 swapId, address buyer);
  event ClaimSwap(
    uint256 swapId,
    address buyer,
    address seller,
    uint256 claimReward
  );
  event CloseSwap(uint256 swapId, address buyer, address seller);

  function createSwap(
    bool isBuyer,
    uint256 initAssetPrice,
    uint256 amountOfAssets,
    uint256 claimPrice,
    uint256 liquidationPrice,
    uint256 sellerDeposit,
    uint256 premium,
    uint256 premiumRate,
    uint256 premiumInterval,
    uint256 totalPremiumRounds
  ) external payable isNotOwner returns (uint256) {
    uint256 buyerDeposit = premium.mul(3) * 1 wei;
    isBuyer ? _sendDeposit(buyerDeposit) : _sendDeposit(sellerDeposit);

    uint256 newSwapId = _createSwap(
      isBuyer,
      initAssetPrice,
      amountOfAssets,
      claimPrice,
      liquidationPrice,
      sellerDeposit,
      premium,
      premiumRate,
      premiumInterval,
      totalPremiumRounds
    );

    emit CreateSwap(
      msg.sender,
      isBuyer,
      newSwapId,
      initAssetPrice,
      amountOfAssets,
      claimPrice,
      liquidationPrice,
      premium,
      premiumRate,
      premiumInterval,
      totalPremiumRounds,
      buyerDeposit
    );

    return newSwapId;
  }

  // token => internal로 바꿀 수 있다.
  function _sendDeposit(uint256 deposit) public payable returns (bool) {
    require(deposit == msg.value, 'Invalid eth amount');
    (bool sent, ) = payable(address(this)).call{value: msg.value}('');
    require(sent, 'Sending deposit failed');
    return true;
  }

  function acceptSwap(
    address addr,
    uint256 initAssetPrice,
    uint256 swapId
  ) external payable isNotOwner isPending(swapId) returns (uint256) {
    require(
      msg.sender != getBuyer(swapId).addr,
      'The buyer can not call the method'
    );
    uint256 sellerDeposit = getSeller(swapId).deposit * 1 wei;
    require(sellerDeposit == msg.value, 'Invalid eth amount');
    payable(address(this)).transfer(msg.value);

    uint256 acceptedSwapId = _acceptSwap(addr, initAssetPrice, swapId);
    emit AcceptSwap(addr, acceptedSwapId, sellerDeposit);
    return acceptedSwapId;
  }

  function cancelSwap(
    uint256 swapId
  ) external isNotOwner isBuyer(swapId) isPending(swapId) returns (bool) {
    (bool sent, ) = msg.sender.call{value: getBuyer(swapId).deposit}('');
    require(sent, 'Sending failed');
    _cancelSwap(swapId);
    emit CancelSwap(swapId, getBuyer(swapId).addr);
    return sent;
  }

  function closeSwap(
    uint256 swapId
  ) external isBuyer(swapId) isActive(swapId) returns (bool) {
    bool sentBuyer = true;
    if (getBuyer(swapId).deposit != 0) {
      (sentBuyer, ) = msg.sender.call{value: getBuyer(swapId).deposit}('');
    }
    (bool sentSeller, ) = getSeller(swapId).addr.call{
      value: getSeller(swapId).deposit
    }('');
    require(sentBuyer && sentSeller, 'Sending deposit failed');
    // set status to closed or inactive
    _cancelSwap(swapId);
    emit CloseSwap(swapId, getBuyer(swapId).addr, getSeller(swapId).addr);
    return true;
  }

  function payPremium(
    uint256 swapId
  ) external payable isBuyer(swapId) isActive(swapId) returns (bool) {
    // date check
    // require(_checkDate(swapId), 'Invalid date');

    require(msg.value == getSwap(swapId).premium, 'Invalid premium');
    (bool sent, ) = getSeller(swapId).addr.call{value: msg.value}('');
    require(sent, 'Sending premium failed');
    // status update
    _payPremium(swapId);
    return true;
  }

  function claimSwap(
    uint256 swapId
  ) external isNotOwner isBuyer(swapId) isActive(swapId) returns (bool) {
    uint256 claimReward = getClaimReward(swapId);
    require(
      claimReward != 0,
      'Claim price in CDS should be higher than current price of asset'
    );
    (bool sentBuyer, ) = msg.sender.call{
      value: (claimReward + getBuyer(swapId).deposit)
    }('');
    (bool sentSeller, ) = msg.sender.call{
      value: (getSeller(swapId).deposit - claimReward)
    }('');
    require(sentBuyer && sentSeller, 'Sending reward failed');
    _claimSwap(swapId);
    emit ClaimSwap(
      swapId,
      getBuyer(swapId).addr,
      getSeller(swapId).addr,
      claimReward
    );
    return true;
  }

  function getClaimReward(uint256 swapId) public view returns (uint256) {
    uint256 currPrice = getPriceFromOracle();
    Swap memory targetSwap = getSwap(swapId);
    if (targetSwap.claimPrice < currPrice) {
      return 0;
    }
    uint256 sellerDeposit = targetSwap.seller.deposit;
    uint256 claimReward = sellerDeposit.calcClaimReward(
      targetSwap.liquidationPrice,
      targetSwap.initAssetPrice,
      targetSwap.amountOfAssets,
      currPrice
    );
    return claimReward;
  }

  function getSwap(uint256 swapId) public view returns (Swap memory) {
    return _swaps[swapId];
  }

  function getBuyer(uint256 swapId) public view returns (Buyer memory) {
    return getSwap(swapId).buyer;
  }

  function getSeller(uint256 swapId) public view returns (Seller memory) {
    return getSwap(swapId).seller;
  }

  function getSwapId() public view returns (Counters.Counter memory) {
    return _swapId;
  }

  function getContractBalance() public view returns (uint256) {
    return address(this).balance;
  }
}
