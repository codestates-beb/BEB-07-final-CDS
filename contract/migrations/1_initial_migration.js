// this script migrates EWEToken
const CDS = artifacts.require('CDS');
const PriceOracleMock = artifacts.require('PriceOracleMock');

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(PriceOracleMock, 2000);
  await deployer.deploy(CDS);
};
