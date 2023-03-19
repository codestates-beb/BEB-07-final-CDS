const FUSD = artifacts.require('FUSD');

const { writeAddress, isDeployed } = require('./utils');

// address 있으면 배포, 없으면 배포 x
module.exports = async function (deployer, network) {
  console.log(`Deploying "FUSD" ON : ** ${network.toUpperCase()} **`);

  try {
    const addr = isDeployed('fusd');
    if (!addr) {
      const FUSDReceipt = await deployer.deploy(FUSD);
      const currentTime = new Date();

      writeAddress('fusd', FUSD.address);

      console.log(`${currentTime}
    Deployed "FUSD" on ***${network.toUpperCase()}*** network
        Contract ADDRESS:  ${FUSD.address}`);
    } else {
      console.log(`Already Deployed ON : ${addr}`);
    }
  } catch (err) {
    console.log(err);
  }
};
