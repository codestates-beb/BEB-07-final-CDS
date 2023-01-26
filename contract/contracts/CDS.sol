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
  modifier isBuyer(uint256 swapId) {
    require(
      msg.sender != _swaps[swapId].buyer.addr,
      'Only buyer of the CDS can call'
    );
    _;
  }

  event CreateSwap(
    address indexed buyer,
    uint256 swapId,
    uint256 initAssetPrice,
    uint256 claimPrice,
    uint256 liquidationPrice,
    uint256 premium,
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

  function createSwap(
    address addr,
    uint256 initAssetPrice,
    uint256 claimPrice,
    uint256 liquidationPrice,
    uint256 sellerDeposit,
    uint256 premium,
    uint256 premiumInterval,
    uint256 totalPremiumRounds
  ) external payable isNotOwner returns (uint256) {
    uint256 buyerDeposit = premium.mul(3) * 1 wei;
    require(buyerDeposit == msg.value, 'Invalid eth amount');
    payable(address(this)).transfer(msg.value);

    uint256 newSwapId = _createSwap(
      addr,
      initAssetPrice,
      claimPrice,
      liquidationPrice,
      sellerDeposit,
      premium,
      premiumInterval,
      totalPremiumRounds
    );

    emit CreateSwap(
      addr,
      newSwapId,
      initAssetPrice,
      claimPrice,
      liquidationPrice,
      premium,
      premiumInterval,
      totalPremiumRounds,
      buyerDeposit
    );

    return newSwapId;
  }

  function acceptSwap(
    address addr,
    uint256 initAssetPrice,
    uint256 swapId
  ) external payable isNotOwner returns (uint256) {
    uint256 sellerDeposit = _swaps[swapId].seller.deposit * 1 wei;
    require(sellerDeposit == msg.value, 'Invalid eth amount');
    payable(address(this)).transfer(msg.value);

    uint256 acceptedSwapId = _acceptSwap(addr, initAssetPrice, swapId);
    emit AcceptSwap(addr, swapId, sellerDeposit);
    return acceptedSwapId;
  }

  function cancelSwap(
    uint256 swapId
  ) external isNotOwner isBuyer(swapId) returns (bool) {
    Swap memory targetSwap = _swaps[swapId];
    (bool sent, ) = msg.sender.call{value: targetSwap.buyer.deposit}('');
    require(sent, 'Sending failed');
    _cancelSwap(swapId);
    emit CancelSwap(swapId, targetSwap.buyer.addr);
    return sent;
  }

  function claimSwap(
    uint256 swapId
  ) external isNotOwner isBuyer(swapId) returns (bool) {
    uint256 claimReward = getClaimReward(swapId);
    require(
      claimReward != 0,
      'Claim price in CDS should be higher than current price of asset'
    );
    Swap memory targetSwap = _swaps[swapId];
    (bool sentBuyer, ) = msg.sender.call{
      value: (claimReward + targetSwap.buyer.deposit)
    }('');
    (bool sentSeller, ) = msg.sender.call{
      value: (targetSwap.seller.deposit - claimReward)
    }('');
    require(sentBuyer && sentSeller, 'Sending reward failed');
    _claimSwap(swapId);
    emit ClaimSwap(
      swapId,
      targetSwap.buyer.addr,
      targetSwap.seller.addr,
      claimReward
    );
    return true;
  }

  function getClaimReward(uint256 swapId) public view returns (uint256) {
    uint256 currPrice = getPriceFromOracle();
    Swap memory targetSwap = _swaps[swapId];
    if (targetSwap.claimPrice < currPrice) {
      return 0;
    }
    uint256 sellerDeposit = targetSwap.seller.deposit;
    uint256 claimReward = sellerDeposit.calcClaimReward(
      targetSwap.liquidationPrice,
      targetSwap.initAssetPrice,
      currPrice
    );
    return claimReward;
  }

  function getSwap(uint256 swapId) public view returns (Swap memory) {
    return _swaps[swapId];
  }

  function getBuyer(uint256 swapId) public view returns (Buyer memory) {
    return _swaps[swapId].buyer;
  }

  function getSeller(uint256 swapId) public view returns (Seller memory) {
    return _swaps[swapId].seller;
  }

  function getSwapId() public view returns (Counters.Counter memory) {
    return _swapId;
  }

  function getContractBalance() public view returns (uint256) {
    return address(this).balance;
  }
}
