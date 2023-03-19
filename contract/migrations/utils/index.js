const fs = require('fs');

const CA_PATH = '../address.json';

module.exports = {
  writeAddress: (contract, address) => {
    let addresses = {};
    try {
      const jsonString = fs.readFileSync(CA_PATH, {
        encoding: 'utf-8',
        flag: 'r',
      });
      addresses = JSON.parse(jsonString);
      addresses[contract] = address;
    } catch (error) {
      addresses[contract] = address;
    }
    const jsonString = JSON.stringify(addresses);
    fs.writeFileSync(CA_PATH, jsonString);
  },
  isDeployed: (contract) => {
    try {
      const jsonString = fs.readFileSync(CA_PATH, {
        encoding: 'utf-8',
        flag: 'r',
      });
      const contractAddresses = JSON.parse(jsonString);
      if (Object.keys(contractAddresses).includes(contract)) {
        return contractAddresses[contract];
      }
      return false;
    } catch (error) {
      return false;
    }
  },
};
