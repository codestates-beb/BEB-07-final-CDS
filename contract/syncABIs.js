const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('./build/contracts');

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
function readFileToJSON() {}
function extractABI() {}

function saveABI() {}
