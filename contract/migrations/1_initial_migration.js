// this script migrates EWEToken
const CDS = artifacts.require('CDS');
const PriceOracleMock = artifacts.require('PriceOracleMock');
const fs = require('fs');

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(PriceOracleMock, 20000);
  const receipt = await deployer.deploy(CDS);
  const txHash = receipt.transactionHash;
  const currentTime = new Date();
  fs.writeFileSync(
    './CDS_CA.txt',
    `${currentTime}\n \nThe Latest ADDRESS of CDS deployed on REMOTE network\n \nADDRESS:  ${CDS.address}\n \nTX HASH:  ${txHash}`,
  );
};
