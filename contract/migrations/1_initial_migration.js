// this script migrates EWEToken
const CDS = artifacts.require('CDS');
const FUSD = artifacts.require('FUSD');
const PriceOracleMock = artifacts.require('PriceOracleMock');
const fs = require('fs');

const priceOracleAddr = '0xe4e0859B42D578B3C8F69EAC10D21b2dF6ef2963';
const fusdAddr = '0x7c858C801e84dc58caafaa3f6f4dA1eA422C599d';

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
  const priceOracleMock = await PriceOracleMock.at(priceOracleAddr);
  const fusd = await FUSD.at(fusdAddr);
  const CDSreceipt = await deployer.deploy(CDS);
  const currentTime = new Date();
  fs.writeFileSync(
    './CDS_CA.txt',
    `${currentTime}
Deployed on ***${network.toUpperCase()}*** network
    CDS ADDRESS:  ${CDS.address}
    CDS TX HASH:  ${CDSreceipt.transactionHash}
    Oracle ADDR:  ${priceOracleMock.address}
    FUSD ADDR  :  ${fusd.address}`,
    // TX HASH:  ${oracleReceipt.transactionHash}`,
  );
};
