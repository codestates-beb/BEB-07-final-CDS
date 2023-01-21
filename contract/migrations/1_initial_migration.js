// this script migrates EWEToken
const CDS = artifacts.require('CDS');
const PriceOracleMock = artifacts.require('PriceOracleMock');

const fs = require('fs-extra');
const path = require('path');

const syncArtifacts = async () => {
  const sourceDir = path.resolve(__dirname, '..', 'build', 'contracts');
  const targetDirs = [];

  targetDirs.push(
    path.resolve(
      __dirname,
      '..',
      '..',
      'blockListener',
      'src',
      'contractArtifacts',
    ),
  );
  targetDirs.push(
    path.resolve(__dirname, '..', '..', 'client', 'src', 'contractArtifacts'),
  );
  targetDirs.forEach((destDir) => {
    try {
      fs.copySync(sourceDir, destDir, { overwrite: true });
      console.log('New Contract Artifacts synced successfully!');
    } catch (err) {
      console.error(err);
    }
  });
};
// To copy a folder or file, select overwrite accordingly

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(PriceOracleMock, 20000);
  await deployer.deploy(CDS);
  await syncArtifacts();
};
