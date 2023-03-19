// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@openzeppelin/contracts/access/Ownable.sol';
import './Handler/CDSBank.sol';

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
    uint256 cdsId
  ) external returns (uint256);

  function cancel(uint256 cdsId) external returns (bool);

  function close(uint256 cdsId) external returns (bool);

  function claim(uint256 cdsId) external returns (bool);

  function expire(uint256 cdsId) external returns (bool);

  function payPremium(uint256 cdsId) external returns (bool);

  function payPremiumByDeposit(
    uint256 cdsId
  ) external returns (bool);

  function withdraw(uint256 amount) external returns (bool);

  event Create(
    address indexed hostAddr,
    bool isBuyer,
    uint256 cdsId,
    uint32 assetType,
    address swap
  );
  event Accept(address indexed guestAddr, uint256 cdsId);
  event Cancel(uint256 cdsId);
  event Claim(uint256 cdsId, uint256 claimReward);
  event Close(uint256 cdsId);
  event Expire(uint256 cdsId);
  event PayPremium(uint256 cdsId);
}

contract CDSLounge is CDSBank, Ownable, CDSInterface {
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
    uint256 newCDSId = _create(
      isBuyer,
      initAssetPrice,
      claimPrice,
      liquidationPrice,
      sellerDeposit,
      premium,
      totalRounds,
      assetType
    );
    _sendDeposit(newCDSId, isBuyer);
    emit Create(
      msg.sender,
      isBuyer,
      newCDSId,
      assetType,
      address(getCDS(newCDSId))
    );
    return newCDSId;
  }

  function accept(
    uint256 initAssetPrice,
    uint256 cdsId
  ) external override returns (uint256) {
    require(
      msg.sender != getBuyer(cdsId) && msg.sender != getSeller(cdsId),
      'The host can not call the method'
    );
    bool isSeller = (getSeller(cdsId) == address(0));
    uint256 acceptedcdsId = _accept(isSeller, initAssetPrice, cdsId);
    _sendDeposit(cdsId, !isSeller);
    _sendFirstPremium(cdsId);
    emit Accept(msg.sender, acceptedcdsId);
    return acceptedcdsId;
  }

  function cancel(
    uint256 cdsId
  ) external override isParticipants(cdsId) returns (bool) {
    _cancel(cdsId);
    _endCDS(cdsId);
    emit Cancel(cdsId);
    return true;
  }

  function close(
    uint256 cdsId
  ) external override isBuyer(cdsId) returns (bool) {
    _close(cdsId);
    _endCDS(cdsId);
    emit Close(cdsId);
    return true;
  }

  function claim(
    uint256 cdsId
  ) external override isBuyer(cdsId) returns (bool) {
    require(
      getCDS(cdsId).getClaimReward() != 0,
      'Current price is higher than the claim price in CDS'
    );
    _claim(cdsId);
    uint256 claimReward = _afterClaim(cdsId);
    emit Claim(cdsId, claimReward);
    return true;
  }

  function expire(uint256 cdsId) external override returns (bool) {
    _expire(cdsId);
    _endCDS(cdsId);
    emit Expire(cdsId);
    return true;
  }

  function payPremium(
    uint256 cdsId
  ) external override isBuyer(cdsId) returns (bool) {
    _payPremium(cdsId);
    _sendPremium(cdsId);
    emit PayPremium(cdsId);
    return true;
  }

  function payPremiumByDeposit(
    uint256 cdsId
  ) external override onlyOwner returns (bool) {
    _payPremium(cdsId);
    _sendPremiumByDeposit(cdsId);
    emit PayPremium(cdsId);
    return true;
  }

  function withdraw(uint256 amount) external override onlyOwner returns (bool) {
    token.transfer(owner(), amount);
    return true;
  }
}

// lounge => factory => cds
// 지금의 factory => crud로 하고
// factory는 assembly-create2써서; 참고할만한건 uniswapv2factory <=> uniswapv2pair
// 작성만 lounge or factory 통하고
// 수정은 cds에 직접 호출? 일단 approved로 factory or lounge ca 추가하는 방향으로 생각하자. owner는 buyer&seller
// factory에는 address의 cdsId(or address)기록 하고 싶음

// buyer는 seller 하나 걸어놓으면 좋은데
// seller는 여러 buyer를 받고 싶을 수도 있음 => 동일 조건의 contract 여러개 배포?
