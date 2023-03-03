// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '../CDS/CDS.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract CDSFactory {
  using Counters for Counters.Counter;
  Counters.Counter internal _cdsId;

  mapping(uint256 => CDS) private _cdsList;

  mapping(uint256 => uint256) public nextPayDate;

  function _create(
    bool _isBuyer,
    uint256 _initAssetPrice,
    uint256 _claimPrice,
    uint256 _liquidationPrice,
    uint256 _sellerDeposit,
    uint256 _premium,
    uint32 _totalRounds,
    uint32 _assetType
  ) internal returns (uint256) {
    _cdsId.increment();
    uint256 newCDSId = _cdsId.current();

    CDS newCDS = new CDS(
      _initAssetPrice,
      _claimPrice,
      _liquidationPrice,
      _premium,
      _sellerDeposit,
      _totalRounds,
      _assetType
    );
    _cdsList[newCDSId] = newCDS;

    _isBuyer ? newCDS.setBuyer(msg.sender) : newCDS.setSeller(msg.sender);

    return newCDSId;
  }

  function _accept(
    bool _isBuyerHost,
    uint256 _initAssetPrice,
    uint256 _targetCDSId
  ) internal isPending(_targetCDSId) returns (uint256) {
    CDS targetCDS = _cdsList[_targetCDSId];
    targetCDS.setInitAssetPrice(_initAssetPrice);

    _isBuyerHost
      ? targetCDS.setSeller(msg.sender)
      : targetCDS.setBuyer(msg.sender);

    nextPayDate[_targetCDSId] = block.timestamp + 4 weeks;

    targetCDS.setStatus(CDS.Status.active);

    return _targetCDSId;
  }

  function _cancel(uint256 _targetCDSId) internal isPending(_targetCDSId) {
    getCDS(_targetCDSId).setStatus(CDS.Status.inactive);
  }

  function _close(uint256 _targetCDSId) internal isActive(_targetCDSId) {
    getCDS(_targetCDSId).setStatus(CDS.Status.expired);
  }

  function _payPremium(uint256 _targetCDSId) internal isActive(_targetCDSId) {
    require(getRounds(_targetCDSId) > 0, 'Round already ended');
    nextPayDate[_targetCDSId] += 4 weeks;
    getCDS(_targetCDSId).setRounds(getRounds(_targetCDSId) - 1);
  }

  function _claim(uint256 _targetCDSId) internal isActive(_targetCDSId) {
    getCDS(_targetCDSId).setStatus(CDS.Status.claimed);
  }

  // getter transactions
  function getCDSId() public view returns (Counters.Counter memory) {
    return _cdsId;
  }

  function getCDS(uint256 cdsId) public view returns (CDS) {
    return _cdsList[cdsId];
  }

  function getPrices(uint256 cdsId) public view returns (uint256[5] memory) {
    return _cdsList[cdsId].getPrices();
  }

  function getPremium(uint256 cdsId) public view returns (uint256) {
    return _cdsList[cdsId].premium();
  }

  function getSellerDeposit(uint256 cdsId) public view returns (uint256) {
    return _cdsList[cdsId].sellerDeposit();
  }

  function getStatus(uint256 cdsId) public view returns (CDS.Status) {
    return _cdsList[cdsId].status();
  }

  function getRounds(uint256 cdsId) public view returns (uint32) {
    return _cdsList[cdsId].rounds();
  }

  function getBuyer(uint256 cdsId) public view returns (address) {
    return _cdsList[cdsId].getBuyer();
  }

  function getSeller(uint256 cdsId) public view returns (address) {
    return _cdsList[cdsId].getSeller();
  }

  // modifiers
  modifier isPending(uint256 cdsId) {
    require(
      getStatus(cdsId) == CDS.Status.pending,
      'The status of the CDS should be pending'
    );
    _;
  }

  modifier isActive(uint256 cdsId) {
    require(
      getStatus(cdsId) == CDS.Status.active,
      'The status of the CDS should be active'
    );
    _;
  }
}
