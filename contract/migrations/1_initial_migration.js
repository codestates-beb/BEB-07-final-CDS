// this script migrates EWEToken
const CDS = artifacts.require('CDS');
const PriceOracleMock = artifacts.require('PriceOracleMock');
const fs = require('fs');

module.exports = async function (deployer, network, accounts) {
  console.log(`Deploying ON : ** ${network.toUpperCase()} **`);
  const oracleReceipt = await deployer.deploy(PriceOracleMock, 20000);
  const CDSreceipt = await deployer.deploy(CDS);
  const currentTime = new Date();
  fs.writeFileSync(
    './CDS_CA.txt',
    `${currentTime}
Deployed on ***${network.toUpperCase()}*** network
    CDS ADDRESS:  ${CDS.address}
    CDS TX HASH:  ${CDSreceipt.transactionHash}
    Oracle ADDR:  ${PriceOracleMock.address}`,
    // TX HASH:  ${oracleReceipt.transactionHash}`,
  );
};
