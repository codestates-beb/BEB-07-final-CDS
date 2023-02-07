// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './SwapHandler.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract AssetHandler is Ownable, SwapHandler {
  using SafeMath for uint256;

  IERC20 public token;

  mapping(uint256 => uint256[2]) private _deposits;

  constructor() {
    token = IERC20(0xd9145CCE52D386f254917e481eB44e9943F39138);
  }

  function setToken(address _tokenAddress) external onlyOwner returns (bool) {
    require(_tokenAddress != address(0));
    token = IERC20(_tokenAddress);
    return true;
  }

  function getDeposits(uint256 swapId) public view returns (uint256[2] memory) {
    return _deposits[swapId];
  }

  function _afterCreate(
    uint256 _swapId,
    bool _isBuyer
  ) internal returns (bool) {
    _isBuyer
      ? _deposits[_swapId][0] = getPremium(_swapId).mul(3)
      : _deposits[_swapId][1] = getSellerDeposit(_swapId);
    return true;
  }

  function _afterAccept(
    uint256 _swapId,
    bool _isBuyerHost
  ) internal returns (bool) {
    _isBuyerHost
      ? _deposits[_swapId][1] = getSellerDeposit(_swapId)
      : _deposits[_swapId][0] = getPremium(_swapId).mul(3);
    return true;
  }

  function _afterCancel(uint256 _swapId) internal returns (bool) {
    uint256 deposit;
    bool isBuyer = (msg.sender == getBuyer(_swapId));
    isBuyer
      ? deposit = getDeposits(_swapId)[0]
      : getDeposits(_swapId)[1];
    bool sent = token.transfer(msg.sender, deposit);
    require(sent, 'Sending deposit failed');
    clearDeposit(_swapId);
    return true;
  }

  function _afterClose(uint256 _swapId) internal returns (bool) {
    uint256 buyerDeposit = getDeposits(_swapId)[0];
    uint256 sellerDeposit = getDeposits(_swapId)[1];
    bool buyerSent = token.transfer(getBuyer(_swapId), buyerDeposit);
    bool sellerSent = token.transfer(getSeller(_swapId), sellerDeposit);
    require(buyerSent && sellerSent, 'Sending deposit failed');
    clearDeposit(_swapId);
    return true;
  }

  function _afterClaim(uint256 _swapId) internal returns (uint256) {
    uint256 claimReward = getSwap(_swapId).getClaimReward();
    require(
      claimReward != 0,
      'Claim price in CDS should be higher than current price of asset'
    );
    bool sentBuyer = token.transfer(
      getBuyer(_swapId),
      claimReward + getDeposits(_swapId)[0]
    );
    bool sentSeller = token.transfer(
      getSeller(_swapId),
      getDeposits(_swapId)[1] - claimReward
    );
    require(sentBuyer && sentSeller, 'Sending reward failed');
    return claimReward;
  }

  function clearDeposit(uint256 swapId) private {
    for (uint i = 0; i <= 1; i++) {
      _deposits[swapId][i] = 0;
    }
  }
}
