// this script migrates EWEToken
const CDS = artifacts.require('CDS');
const FUSD = artifacts.require('FUSD');
const PriceOracleMock = artifacts.require('PriceOracleMock');
const fs = require('fs');

require('dotenv').config();

const { PRICE_ORACLE_ADDRESS, FUSD_ADDRESS } = process.env;

module.exports = async function (deployer, network, accounts) {
  console.log(`Deploying ON : ** ${network.toUpperCase()} **`);
  /*
  const oracleReceipt = await deployer.deploy(
    PriceOracleMock,
    2500000000000,
    160000000000,
    750000000,
  );
  const FUSDReceipt = await deployer.deploy(FUSD);
  */
  const priceOracle = await PriceOracleMock.at(PRICE_ORACLE_ADDRESS);
  const fusd = await FUSD.at(FUSD_ADDRESS);
  const CDSreceipt = await deployer.deploy(CDS);
  const currentTime = new Date();
  fs.writeFileSync(
    './CDS_CA.txt',
    `${currentTime}
Deployed on ***${network.toUpperCase()}*** network
    CDS ADDRESS:  ${CDS.address}
    CDS TX HASH:  ${CDSreceipt.transactionHash}
    Oracle ADDR:  ${priceOracle.address}
    FUSD ADDR  :  ${fusd.address}`,
    // TX HASH:  ${oracleReceipt.transactionHash}`,
  );
};
