// this script migrates EWEToken
const CDS = artifacts.require('CDS');
const FUSD = artifacts.require('FUSD');
const PriceOracleMock = artifacts.require('PriceOracleMock');
const fs = require('fs');

module.exports = async function (deployer, network, accounts) {
  console.log(`Deploying ON : ** ${network.toUpperCase()} **`);
  const oracleReceipt = await deployer.deploy(PriceOracleMock, 25000);
  const FUSDReceipt = await deployer.deploy(FUSD);
  const CDSreceipt = await deployer.deploy(CDS);
  const currentTime = new Date();
  fs.writeFileSync(
    './CDS_CA.txt',
    `${currentTime}
Deployed on ***${network.toUpperCase()}*** network
    CDS ADDRESS:  ${CDS.address}
    CDS TX HASH:  ${CDSreceipt.transactionHash}
    Oracle ADDR:  ${PriceOracleMock.address}
    FUSD ADDR  :  ${FUSD.address}`,
    // TX HASH:  ${oracleReceipt.transactionHash}`,
  );
};
