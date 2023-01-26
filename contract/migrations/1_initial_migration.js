// this script migrates EWEToken
const CDS = artifacts.require('CDS');
const PriceOracleMock = artifacts.require('PriceOracleMock');
const fs = require('fs');

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(PriceOracleMock, 20000);
  await deployer.deploy(CDS);
  const currentTime = new Date();
  fs.writeFileSync(
    './CDS_CA.txt',
    `${currentTime}\n \nThe Newest ADDRESS of CDS deployed on REMOTE network\n \n${CDS.address}`,
  );
};
