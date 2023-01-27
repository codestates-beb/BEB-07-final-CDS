// this script migrates EWEToken
const CDS = artifacts.require('CDS');
const PriceOracleMock = artifacts.require('PriceOracleMock');
const fs = require('fs');

module.exports = async function (deployer, network, accounts) {
  const oracleReceipt = await deployer.deploy(PriceOracleMock, 20000);
  const CDSreceipt = await deployer.deploy(CDS);
  const currentTime = new Date();
  fs.writeFileSync(
    './CDS_CA.txt',
    `${currentTime}
The Latest ADDRESS of CDS and Oracle deployed on REMOTE network
    CDS ADDRESS:  ${CDS.address}
    CDS deploy TX HASH:  ${CDSreceipt.transactionHash}
    Oracle ADDRESS:  ${PriceOracleMock.address}`,
    // TX HASH:  ${oracleReceipt.transactionHash}`,
  );
};
