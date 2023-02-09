/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const Web3 = require('web3');
const _ = require('lodash');

const {
  GETH_HOST,
  GETH_PORT,
  CDS_CA,
  ORACLE_CA,
  FUSD_CA,
  KANG_PK,
  KIM_PK,
  SEOL_PK,
  HONG_PK,
} = process.env;

// const web3 = new Web3(`http://${GETH_HOST}:${GETH_PORT}`);
const web3 = new Web3(`ws://snowdelver.iptime.org:48556`); // using local network

const OracleABI = require('../build/contracts/PriceOracleMock.json');
const CDSABI = require('../build/contracts/CDS.json');
const FUSDABI = require('../build/contracts/FUSD.json');

const kangAccount = web3.eth.accounts.privateKeyToAccount(KANG_PK);
const kimAccount = web3.eth.accounts.privateKeyToAccount(KIM_PK);
const seolAccount = web3.eth.accounts.privateKeyToAccount(SEOL_PK);
const hongAccount = web3.eth.accounts.privateKeyToAccount(HONG_PK);
const addresses = [
  kangAccount.address,
  kimAccount.address,
  seolAccount.address,
  hongAccount.address,
];

// **isBuyer**: true

// **initialPriceOfAssets**: 25000

// amountOfAssets: 10

// **claimPrice**: 21250

// **liquidationPrice**: 20000

// **premium**: 750

// **premiumInterval**: 4 weeks (test 5min ~ 10min)

// TotalPremiumRounds: 6

// **sellerDeposit**: 50000

const defaultHostSetting = true; // isBuyer
const defaultInitAssetPrice = 25000;
const defaultClaimPrice = 21250;
const defaultLiquidationPrice = 20000;
const defaultSellerDeposit = 50000;
const defaultPremium = 750;
const defaultPremiumInterval = 60 * 10; // 10 minutes
const defaultPremiumRounds = 12; // total lifecycle of test cds is 2hrs
const defaultBuyerDeposit = defaultPremium * 4;
console.log('*******************1');
// create contract objects
const priceOracleMock = new web3.eth.Contract(OracleABI.abi, ORACLE_CA);
const cds = new web3.eth.Contract(CDSABI.abi, CDS_CA);
const fusd = new web3.eth.Contract(FUSDABI.abi, FUSD_CA);
(async () => {
  await cds.methods.setOracle(ORACLE_CA).send({
    from: addresses[0],
  });
})();
// set priceoracle berfore init

// 전체 시나리오는 비동기로 수행한다.
// 시나리오 별로는 동기적으로 수행해야한다.
console.log('*******************2');
async function createSwap(buyer, seller, isBuyer) {
  try {
    await fusd.methods
      .approve(CDS_CA, isBuyer ? defaultBuyerDeposit : defaultSellerDeposit)
      .send({ from: isBuyer ? buyer : seller });
    const result = await cds.methods
      .create(
        isBuyer,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumRounds,
      )
      .send({
        from: isBuyer ? buyer : seller,
      });
    const { returnValues } = result.events.Create;
    const { swapId } = returnValues;
    console.log(`Create Swap : ${swapId}`);
    return returnValues;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function cancelSwap(buyer, seller, isBuyer, swapId) {
  const result = await cds.methods.cancel(swapId).send({
    from: isBuyer ? buyer : seller,
  });
  console.log(`Create Swap : ${swapId}`);
  const { returnValues } = result.events.Cancel;
  return returnValues;
}

async function acceptSwap(buyer, seller, isBuyer, swapId) {
  const approveResult = await fusd.methods
    .approve(CDS_CA, isBuyer ? defaultSellerDeposit : defaultBuyerDeposit)
    .send({ from: isBuyer ? seller : buyer });
  const result = await cds.methods.accept(defaultInitAssetPrice, swapId).send({
    from: isBuyer ? seller : buyer,
  });
  console.log(`Accept Swap : ${swapId}`);
  const { returnValues } = result.events.Accept;
  return returnValues;
}

async function closeSwap(buyer, swapId) {
  const result = await cds.methods.close(swapId).send({
    from: buyer,
  });
  console.log(`Close Swap : ${swapId}`);
  const { returnValues } = result.events.Close;
  return returnValues;
}

async function claimSwap(buyer, swapId) {
  const result = await cds.methods.claim(swapId).send({
    from: buyer,
  });
  console.log(`Claim Swap : ${swapId}`);
  const { returnValues } = result.events.Claim;
  return returnValues;
}

async function payPremium(buyer, swapId) {
  const approveResult = await fusd.methods
    .approve(CDS_CA, defaultPremium)
    .send({ from: buyer });
  const result = await cds.methods.payPremium(swapId).send({
    from: buyer,
  });
  console.log(`PayPremium : ${swapId}`);
  const { returnValues } = result.events.PayPremium;
  return returnValues;
}

async function createPending() {
  try {
    const currentSecond = new Date().getMilliseconds();
    const isBuyer = currentSecond % 2 === 0;
    [buyer, seller] = _.sampleSize(addresses, 2);
    await createSwap(buyer, seller, isBuyer);
  } catch (err) {
    console.error(err);
  }
}
async function createCancel() {
  try {
    const currentSecond = new Date().getMilliseconds();
    const isBuyer = currentSecond % 2 === 0;
    const [buyer, seller] = _.sampleSize(addresses, 2);
    const { swapId } = await createSwap(buyer, seller, isBuyer);
    await cancelSwap(buyer, seller, isBuyer, swapId);
  } catch (err) {
    console.error(err);
  }
}

async function createAccept() {
  try {
    const currentSecond = new Date().getMilliseconds();
    const isBuyer = currentSecond % 2 === 0;
    const [buyer, seller] = _.sampleSize(addresses, 2);
    const returnValues = await createSwap(buyer, seller, isBuyer);
    const { swapId } = returnValues;
    await acceptSwap(buyer, seller, isBuyer, swapId);
  } catch (err) {
    console.error(err);
  }
}

async function createAcceptClose() {
  try {
    const currentSecond = new Date().getMilliseconds();
    const isBuyer = currentSecond % 2 === 0;
    const [buyer, seller] = _.sampleSize(addresses, 2);

    const returnValues = await createSwap(buyer, seller, isBuyer);
    const { swapId } = returnValues;
    await acceptSwap(buyer, seller, isBuyer, swapId);
    await closeSwap(buyer, swapId);
  } catch (err) {
    console.error(err);
  }
}

async function createAcceptClaim() {
  try {
    const currentSecond = new Date().getMilliseconds();
    const isBuyer = currentSecond % 2 === 0;
    const [buyer, seller] = _.sampleSize(addresses, 2);

    const returnValues = await createSwap(buyer, seller, isBuyer);
    const { swapId } = returnValues;
    await acceptSwap(buyer, seller, isBuyer, swapId);
    await priceOracleMock.methods
      .setPrice(defaultClaimPrice - 1)
      .send({ from: buyer });
    await claimSwap(buyer, swapId);
    // price oracle roll back
    await priceOracleMock.methods.setPrice(20000).send({ from: buyer });
    // claimSwap();
  } catch (err) {
    console.error(err);
  }
}

async function createAcceptLiquidate() {
  try {
    const currentSecond = new Date().getMilliseconds();
    const isBuyer = currentSecond % 2 === 0;
    const [buyer, seller] = _.sampleSize(addresses, 2);

    const returnValues = await createSwap(buyer, seller, isBuyer);
    const { swapId } = returnValues;
    await acceptSwap(buyer, seller, isBuyer, swapId);
    await priceOracleMock.methods
      .setPrice(defaultLiquidationPrice - 1)
      .send({ from: buyer });
    await claimSwap(buyer, swapId);
    // price oracle roll back
    await priceOracleMock.methods.setPrice(20000).send({ from: buyer });
  } catch (err) {
    console.error(err);
  }
}

async function createAcceptPay() {
  try {
    const currentSecond = new Date().getMilliseconds();
    const isBuyer = currentSecond % 2 === 0;
    const [buyer, seller] = _.sampleSize(addresses, 2);

    const returnValues = await createSwap(buyer, seller, isBuyer);
    const { swapId } = returnValues;
    await acceptSwap(buyer, seller, isBuyer, swapId);
    await payPremium(buyer, swapId);
  } catch (err) {
    console.error(err);
  }
}

async function triggerAllSingle() {
  await createPending();
  console.log(1);
  await createAccept();
  console.log(2);
  await createCancel();
  console.log(3);
  await createAcceptClose();
  console.log(4);
  await createAcceptClaim();
  console.log(5);
  await createAcceptLiquidate();
  console.log(6);
  await createAcceptPay();
  console.log(7);
}
triggerAllSingle();

// let count = 0;
// const totalSwaps = 20;
// while (count < totalSwaps) {
//   const random = _.random(0, 99);
//   if (random < 5) {
//     createAcceptClose(); // 5%
//   } else if (random < 10) {
//     createAcceptLiquidate(); // 5%
//   } else if (random < 20) {
//     createCancel(); // 10%
//   } else if (random < 30) {
//     createAccept(); // 10%
//   } else if (random < 50) {
//     createPending(); // 20%
//   } else if (random < 70) {
//     createAcceptClaim(); // 20%
//   } else if (random < 100) {
//     createAcceptPay(); // 30%
//   }
//   // createAcceptClose(); // 5%
//   // createAcceptLiquidate(); // 5%
//   // createCancel(); // 10%
//   // createAccept(); // 10%
//   // createPending(); // 20%
//   // createAcceptClaim(); // 20%
//   // createAcceptPay(); // 30%
//   count++;
// }

async function approveCreate() {
  console.log(
    await cds.methods.getSwapId().call({ from: seolAccount.address }),
  );
  console.log(await fusd.methods.balanceOf(seolAccount.address).call());
  console.log(await fusd.methods.allowance(seolAccount.address, CDS_CA).call());
  await fusd.methods
    .approve(CDS_CA, defaultBuyerDeposit)
    .send({ from: seolAccount.address });
  console.log(await fusd.methods.allowance(seolAccount.address, CDS_CA).call());
  console.log('approval success');
  await cds.methods
    .create(
      true,
      defaultInitAssetPrice,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumRounds,
    )
    .send({ from: seolAccount.address });
  console.log('create success');
}

// try {
//   approveCreate();
// } catch (err) {
//   console.error(err);
// }
