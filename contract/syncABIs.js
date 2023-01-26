const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const files = fs.readdirSync('./build/contracts');

exec('truffle compile', (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);

  files.forEach((file) => {
    const filePath = path.resolve('build', 'contracts', file);
    const { abi } = JSON.parse(fs.readFileSync(filePath));
    const wrappedABI = {};
    wrappedABI.abi = abi;
    const blockListenerPath = path.resolve(
      '..',
      'blockListener',
      'src',
      'contractArtifacts',
      file,
    );
    const clientPath = path.resolve(
      '..',
      'client',
      'src',
      'assets',
      'contract',
      file,
    );
    fs.writeFileSync(blockListenerPath, JSON.stringify(wrappedABI), {
      overwrite: true,
    });
    fs.writeFileSync(clientPath, JSON.stringify(wrappedABI), {
      overwrite: true,
    });
  });
});
