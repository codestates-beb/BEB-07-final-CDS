/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const Web3 = require('web3');

const web3 = new Web3('http://20.214.105.181:8545');

const OracleABI = require('../build/contracts/PriceOracleMock.json');
const CDSABI = require('../build/contracts/CDS.json');

const OracleCA = '0x62f98AFF6349DfF21a184e10CAbB9C3AcA10fa74';
const CDSCA = '0x4758213ffaD552EE16435f003e409b2e9dF65D57';

const kimAccount = web3.eth.accounts.privateKeyToAccount(
  '0x6370fd033278c143179d81c5526140625662b8daa446c22ee2d73db3707e620c',
);
const seolAccount = web3.eth.accounts.privateKeyToAccount(
  '0x646f1ce2fdad0e6deeeb5c7e8e5543bdde65e86029e2fd9fc169899c440a7913',
);

const initialPrice = 20000;
const defaultClaimPrice = 15000;
const defaultLiquidationPrice = 10000;
const defaultSellerDeposit = 100000;
const defaultPremium = 3000;
const defaultPremiumInterval = 60 * 10; // 10 minutes
const defaultPremiumRounds = 12; // total lifecycle of test cds is 2hrs

// create contract objects
const priceOracleMock = new web3.eth.Contract(OracleABI.abi, CDSCA);
const cds = new web3.eth.Contract(CDSABI.abi, CDSCA);

console.log(seolAccount);
// set priceoracle berfore init
const create = async () => {
  try {
    console.log('----------');
    console.log(await web3.eth.getBalance(kimAccount.address));
    console.log(await web3.eth.getBalance(seolAccount.address));
    console.log('----------');
    await cds.methods.setOracle(OracleCA).send({ from: kimAccount.address });

    // invoke makeSwap event
    await cds.methods
      .createSwap(
        kimAccount.address,
        initialPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
      )
      .send({
        from: kimAccount.address,
        gasPrice: '20000000000',
        gas: '6721975',
        value: defaultPremium * 3,
      });
  } catch (err) {
    console.error(err);
  }
};

const accept = async () => {
  // get current swapId for acceptSwap
  const [currentSwapId] = await cds.methods.getSwapId().call();
  // invoke acceptSwap event
  await cds.methods
    .acceptSwap(seolAccount.address, initialPrice, currentSwapId)
    .send({
      from: seolAccount.address,
      gasPrice: '20000000000',
      gas: '6721975',
      value: defaultSellerDeposit,
    });
};

const cancel = async () => {
  console.log('before cancel ----------');
  console.log(await web3.eth.getBalance(kimAccount.address));
  console.log(await web3.eth.getBalance(seolAccount.address));
  console.log('before cancel ----------');
  const [currentSwapId] = await cds.methods.getSwapId().call();
  await cds.methods.cancelSwap(currentSwapId).send({
    from: kimAccount.address,
    gasPrice: '20000000000',
    gas: '6721975',
  });
  console.log('after cancel ----------');
  console.log(await web3.eth.getBalance(kimAccount.address));
  console.log(await web3.eth.getBalance(seolAccount.address));
  console.log('after cancel ----------');
};

// 99766267459999559000
// 99764979279999568000
// create();
// setTimeout(accept, 2000);

create();
setTimeout(cancel, 5000);
