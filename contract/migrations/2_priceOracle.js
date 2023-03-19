const PriceOracleMock = artifacts.require('PriceOracleMock');

const { writeAddress, isDeployed } = require('./utils');

// address 있으면 배포, 없으면 배포 x
module.exports = async function (deployer, network) {
  console.log(`Deploying "PriceOracle" ON : ** ${network.toUpperCase()} **`);

  try {
    const addr = isDeployed('priceOracle');
    if (!addr) {
      const PriceOracleMockReceipt = await deployer.deploy(PriceOracleMock);
      const currentTime = new Date();

      writeAddress('priceOracle', PriceOracleMock.address);

      console.log(`${currentTime}
    Deployed "PriceOracle" on ***${network.toUpperCase()}*** network
        Contract ADDRESS:  ${PriceOracleMock.address}`);
    } else {
      console.log(`Already Deployed ON : ${addr}`);
    }
  } catch (err) {
    console.log(err);
  }
};
