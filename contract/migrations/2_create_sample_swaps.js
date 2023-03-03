// this script migrates EWEToken
const CDS = artifacts.require('CDSLounge');
const PriceOracleMock = artifacts.require('PriceOracleMock');
const FUSD = artifacts.require('FUSD');
// const Swaps = artifacts.require('Swaps');

require('dotenv').config();

const defaultHostSetting = true;
const defaultPremiumRounds = 12; // total lifecycle of test cds is 2hrs
const defaultTokenFaucet = '10000000';

const defaultCaseBTC = {
  defaultInitAssetPrice: 25000,
  defaultClaimPrice: 21250,
  defaultLiquidationPrice: 20000,
  defaultSellerDeposit: 50000,
  defaultPremium: 750,
  defaultBuyerDeposit: 3000,
  defaultAssetType: 0,
};
const defaultCaseETH = {
  defaultInitAssetPrice: 1600,
  defaultClaimPrice: 1400,
  defaultLiquidationPrice: 1200,
  defaultSellerDeposit: 4000,
  defaultPremium: 40,
  defaultBuyerDeposit: 160,
  defaultAssetType: 1,
};
const defaultCaseLink = {
  defaultInitAssetPrice: 8,
  defaultClaimPrice: 6,
  defaultLiquidationPrice: 5,
  defaultSellerDeposit: 3000,
  defaultPremium: 40,
  defaultBuyerDeposit: 160,
  defaultAssetType: 2,
};

const { PRICE_ORACLE_ADDRESS, FUSD_ADDRESS } = process.env;

let currentCDSId;
module.exports = async function (deployer, network, accounts) {
  console.log(`Triggering Initial TXs ON : ** ${network.toUpperCase()} **`);
  try {
    const priceOracleMock = await PriceOracleMock.at(PRICE_ORACLE_ADDRESS);
    const fusd = await FUSD.at(FUSD_ADDRESS);
    // const swaps = await Swaps.at('0x712F138Bb2401b654aE9B3824047dCB6F6FFCD0C');

    await fusd.transfer(accounts[1], defaultTokenFaucet, { from: accounts[0] });
    await fusd.transfer(accounts[2], defaultTokenFaucet, { from: accounts[0] });
    await fusd.transfer(accounts[3], defaultTokenFaucet, { from: accounts[0] });
    await fusd.transfer(accounts[4], defaultTokenFaucet, { from: accounts[0] });
    // settings
    const cds = await CDS.deployed();

    // case1 - btc: account[2] create, account[1] accepts
    await fusd.approve(cds.address, defaultCaseBTC.defaultBuyerDeposit, {
      from: accounts[2],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseBTC.defaultInitAssetPrice,
      defaultCaseBTC.defaultClaimPrice,
      defaultCaseBTC.defaultLiquidationPrice,
      defaultCaseBTC.defaultSellerDeposit,
      defaultCaseBTC.defaultPremium,
      defaultPremiumRounds,
      defaultCaseBTC.defaultAssetType,
      { from: accounts[2] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseBTC.defaultSellerDeposit, {
      from: accounts[1],
    });
    await cds.accept(defaultCaseBTC.defaultInitAssetPrice, currentCDSId, {
      from: accounts[1],
    });
    console.log('--case 1 of btc created');

    // case1 - eth: account[3] create, account[1] accepts
    await fusd.approve(cds.address, defaultCaseETH.defaultBuyerDeposit, {
      from: accounts[3],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseETH.defaultInitAssetPrice,
      defaultCaseETH.defaultClaimPrice,
      defaultCaseETH.defaultLiquidationPrice,
      defaultCaseETH.defaultSellerDeposit,
      defaultCaseETH.defaultPremium,
      defaultPremiumRounds,
      defaultCaseETH.defaultAssetType,
      { from: accounts[3] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseETH.defaultSellerDeposit, {
      from: accounts[1],
    });
    await cds.accept(defaultCaseETH.defaultInitAssetPrice, currentCDSId, {
      from: accounts[1],
    });
    console.log('--case 1 of eth created');

    // case1 - link: account[1] create, account[4] accepts
    await fusd.approve(cds.address, defaultCaseLink.defaultBuyerDeposit, {
      from: accounts[1],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseLink.defaultInitAssetPrice,
      defaultCaseLink.defaultClaimPrice,
      defaultCaseLink.defaultLiquidationPrice,
      defaultCaseLink.defaultSellerDeposit,
      defaultCaseLink.defaultPremium,
      defaultPremiumRounds,
      defaultCaseLink.defaultAssetType,
      { from: accounts[1] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseLink.defaultSellerDeposit, {
      from: accounts[4],
    });
    await cds.accept(defaultCaseLink.defaultInitAssetPrice, currentCDSId, {
      from: accounts[4],
    });
    console.log('--case 1 of link created');
    console.log('case 1 complete!');

    // case2 - btc: account[2] create and cancel
    await fusd.approve(cds.address, defaultCaseBTC.defaultBuyerDeposit, {
      from: accounts[2],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseBTC.defaultInitAssetPrice,
      defaultCaseBTC.defaultClaimPrice,
      defaultCaseBTC.defaultLiquidationPrice,
      defaultCaseBTC.defaultSellerDeposit,
      defaultCaseBTC.defaultPremium,
      defaultPremiumRounds,
      defaultCaseBTC.defaultAssetType,
      { from: accounts[2] },
    );
    [currentCDSId] = await cds.getCDSId();
    await cds.cancel(currentCDSId, { from: accounts[2] });
    console.log('--case 2 of btc created');

    // case2 - eth: account[2] create and cancel
    await fusd.approve(cds.address, defaultCaseETH.defaultBuyerDeposit, {
      from: accounts[3],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseETH.defaultInitAssetPrice,
      defaultCaseETH.defaultClaimPrice,
      defaultCaseETH.defaultLiquidationPrice,
      defaultCaseETH.defaultSellerDeposit,
      defaultCaseETH.defaultPremium,
      defaultPremiumRounds,
      defaultCaseETH.defaultAssetType,
      { from: accounts[3] },
    );
    [currentCDSId] = await cds.getCDSId();
    await cds.cancel(currentCDSId, { from: accounts[3] });
    console.log('--case 2 of eth created');

    // case2 - link: account[3] create and cancel
    await fusd.approve(cds.address, defaultCaseLink.defaultBuyerDeposit, {
      from: accounts[3],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseLink.defaultInitAssetPrice,
      defaultCaseLink.defaultClaimPrice,
      defaultCaseLink.defaultLiquidationPrice,
      defaultCaseLink.defaultSellerDeposit,
      defaultCaseLink.defaultPremium,
      defaultPremiumRounds,
      defaultCaseLink.defaultAssetType,
      { from: accounts[3] },
    );
    [currentCDSId] = await cds.getCDSId();
    await cds.cancel(currentCDSId, { from: accounts[3] });
    console.log('--case 2 of link created');
    console.log('case 2 complete!');

    // case3 - btc: account[4] creates and nobody accepts
    await fusd.approve(cds.address, defaultCaseBTC.defaultBuyerDeposit, {
      from: accounts[4],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseBTC.defaultInitAssetPrice,
      defaultCaseBTC.defaultClaimPrice,
      defaultCaseBTC.defaultLiquidationPrice,
      defaultCaseBTC.defaultSellerDeposit,
      defaultCaseBTC.defaultPremium,
      defaultPremiumRounds,
      defaultCaseBTC.defaultAssetType,
      { from: accounts[4] },
    );
    console.log('--case 3 of btc created');

    // case3 - eth: account[1] creates and nobody accepts
    await fusd.approve(cds.address, defaultCaseETH.defaultBuyerDeposit, {
      from: accounts[1],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseETH.defaultInitAssetPrice,
      defaultCaseETH.defaultClaimPrice,
      defaultCaseETH.defaultLiquidationPrice,
      defaultCaseETH.defaultSellerDeposit,
      defaultCaseETH.defaultPremium,
      defaultPremiumRounds,
      defaultCaseETH.defaultAssetType,
      { from: accounts[1] },
    );
    console.log('--case 3 of eth created');

    // case3 - link: account[2] creates and nobody accepts
    await fusd.approve(cds.address, defaultCaseLink.defaultBuyerDeposit, {
      from: accounts[2],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseLink.defaultInitAssetPrice,
      defaultCaseLink.defaultClaimPrice,
      defaultCaseLink.defaultLiquidationPrice,
      defaultCaseLink.defaultSellerDeposit,
      defaultCaseLink.defaultPremium,
      defaultPremiumRounds,
      defaultCaseLink.defaultAssetType,
      { from: accounts[2] },
    );
    console.log('--case 3 of link created');
    console.log('case 3 complete!');

    // case4 - btc: account[3] creates and account[1] accepts
    // after price dropped below claim price, account[3] claimes
    await fusd.approve(cds.address, defaultCaseBTC.defaultBuyerDeposit, {
      from: accounts[3],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseBTC.defaultInitAssetPrice,
      defaultCaseBTC.defaultClaimPrice,
      defaultCaseBTC.defaultLiquidationPrice,
      defaultCaseBTC.defaultSellerDeposit,
      defaultCaseBTC.defaultPremium,
      defaultPremiumRounds,
      defaultCaseBTC.defaultAssetType,
      { from: accounts[3] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseBTC.defaultSellerDeposit, {
      from: accounts[1],
    });
    await cds.accept(defaultCaseBTC.defaultInitAssetPrice, currentCDSId, {
      from: accounts[1],
    });
    await priceOracleMock.setBTCPrice(2100000000000, { from: accounts[0] });
    await cds.claim(currentCDSId, { from: accounts[3] });
    console.log('--case 4 of btc created');

    // case4 - eth: account[1] creates and account[3] accepts
    // after price dropped below claim price, account[1] claimes
    await fusd.approve(cds.address, defaultCaseETH.defaultBuyerDeposit, {
      from: accounts[1],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseETH.defaultInitAssetPrice,
      defaultCaseETH.defaultClaimPrice,
      defaultCaseETH.defaultLiquidationPrice,
      defaultCaseETH.defaultSellerDeposit,
      defaultCaseETH.defaultPremium,
      defaultPremiumRounds,
      defaultCaseETH.defaultAssetType,
      { from: accounts[1] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseETH.defaultSellerDeposit, {
      from: accounts[3],
    });
    await cds.accept(defaultCaseETH.defaultInitAssetPrice, currentCDSId, {
      from: accounts[3],
    });
    await priceOracleMock.setETHPrice(130000000000, { from: accounts[0] });
    await cds.claim(currentCDSId, { from: accounts[1] });
    console.log('--case 4 of eth created');

    // case4 - btc: account[4] creates and account[2] accepts
    // after price dropped below claim price, account[4] claimes
    await fusd.approve(cds.address, defaultCaseLink.defaultBuyerDeposit, {
      from: accounts[4],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseLink.defaultInitAssetPrice,
      defaultCaseLink.defaultClaimPrice,
      defaultCaseLink.defaultLiquidationPrice,
      defaultCaseLink.defaultSellerDeposit,
      defaultCaseLink.defaultPremium,
      defaultPremiumRounds,
      defaultCaseLink.defaultAssetType,
      { from: accounts[4] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseLink.defaultSellerDeposit, {
      from: accounts[2],
    });
    await cds.accept(defaultCaseLink.defaultInitAssetPrice, currentCDSId, {
      from: accounts[2],
    });
    await priceOracleMock.setLinkPrice(550000000, { from: accounts[0] });
    await cds.claim(currentCDSId, { from: accounts[4] });
    console.log('--case 4 of link created');

    console.log('case 4 complete');

    // case5 - btc: account[3] creates and account[1] accepts
    // after price dropped below liquidation price, account[3] claimes
    await fusd.approve(cds.address, defaultCaseBTC.defaultBuyerDeposit, {
      from: accounts[3],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseBTC.defaultInitAssetPrice,
      defaultCaseBTC.defaultClaimPrice,
      defaultCaseBTC.defaultLiquidationPrice,
      defaultCaseBTC.defaultSellerDeposit,
      defaultCaseBTC.defaultPremium,
      defaultPremiumRounds,
      defaultCaseBTC.defaultAssetType,
      { from: accounts[3] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseBTC.defaultSellerDeposit, {
      from: accounts[1],
    });
    await cds.accept(defaultCaseBTC.defaultInitAssetPrice, currentCDSId, {
      from: accounts[1],
    });
    await priceOracleMock.setBTCPrice(1900000000000, { from: accounts[0] });
    await cds.claim(currentCDSId, { from: accounts[3] });
    console.log('--case 5 of btc created');

    // case5 - eth: account[1] creates and account[2] accepts
    // after price dropped below liquidation price, account[1] claimes
    await fusd.approve(cds.address, defaultCaseETH.defaultBuyerDeposit, {
      from: accounts[1],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseETH.defaultInitAssetPrice,
      defaultCaseETH.defaultClaimPrice,
      defaultCaseETH.defaultLiquidationPrice,
      defaultCaseETH.defaultSellerDeposit,
      defaultCaseETH.defaultPremium,
      defaultPremiumRounds,
      defaultCaseETH.defaultAssetType,
      { from: accounts[1] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseETH.defaultSellerDeposit, {
      from: accounts[2],
    });
    await cds.accept(defaultCaseETH.defaultInitAssetPrice, currentCDSId, {
      from: accounts[2],
    });
    await priceOracleMock.setETHPrice(110000000000, { from: accounts[0] });
    await cds.claim(currentCDSId, { from: accounts[1] });
    console.log('--case 5 of eth created');

    // case5 - link: account[4] creates and account[3] accepts
    // after price dropped below liquidation price, account[4] claimes
    await fusd.approve(cds.address, defaultCaseLink.defaultBuyerDeposit, {
      from: accounts[4],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseLink.defaultInitAssetPrice,
      defaultCaseLink.defaultClaimPrice,
      defaultCaseLink.defaultLiquidationPrice,
      defaultCaseLink.defaultSellerDeposit,
      defaultCaseLink.defaultPremium,
      defaultPremiumRounds,
      defaultCaseLink.defaultAssetType,
      { from: accounts[4] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseLink.defaultSellerDeposit, {
      from: accounts[3],
    });
    await cds.accept(defaultCaseLink.defaultInitAssetPrice, currentCDSId, {
      from: accounts[3],
    });
    await priceOracleMock.setLinkPrice(400000000, { from: accounts[0] });
    await cds.claim(currentCDSId, { from: accounts[4] });
    console.log('--case 5 of link created');
    console.log('case 5 complete!');

    // case6 - btc: account[1] creates and account[3] accepts
    // account[1] closes swap
    await fusd.approve(cds.address, defaultCaseBTC.defaultBuyerDeposit, {
      from: accounts[1],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseBTC.defaultInitAssetPrice,
      defaultCaseBTC.defaultClaimPrice,
      defaultCaseBTC.defaultLiquidationPrice,
      defaultCaseBTC.defaultSellerDeposit,
      defaultCaseBTC.defaultPremium,
      defaultPremiumRounds,
      defaultCaseBTC.defaultAssetType,
      { from: accounts[1] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseBTC.defaultSellerDeposit, {
      from: accounts[3],
    });
    await cds.accept(defaultCaseBTC.defaultInitAssetPrice, currentCDSId, {
      from: accounts[3],
    });
    await cds.close(currentCDSId, { from: accounts[1] });
    console.log('--case 6 of btc created');

    // case6 - btc: account[1] creates and account[4] accepts
    // account[1] closes swap
    await fusd.approve(cds.address, defaultCaseETH.defaultBuyerDeposit, {
      from: accounts[1],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseETH.defaultInitAssetPrice,
      defaultCaseETH.defaultClaimPrice,
      defaultCaseETH.defaultLiquidationPrice,
      defaultCaseETH.defaultSellerDeposit,
      defaultCaseETH.defaultPremium,
      defaultPremiumRounds,
      defaultCaseETH.defaultAssetType,
      { from: accounts[1] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseETH.defaultSellerDeposit, {
      from: accounts[4],
    });
    await cds.accept(defaultCaseETH.defaultInitAssetPrice, currentCDSId, {
      from: accounts[4],
    });
    await cds.close(currentCDSId, { from: accounts[1] });
    console.log('--case 6 of eth created');

    // case6 - btc: account[2] creates and account[3] accepts
    // account[2] closes swap
    await fusd.approve(cds.address, defaultCaseLink.defaultBuyerDeposit, {
      from: accounts[2],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseLink.defaultInitAssetPrice,
      defaultCaseLink.defaultClaimPrice,
      defaultCaseLink.defaultLiquidationPrice,
      defaultCaseLink.defaultSellerDeposit,
      defaultCaseLink.defaultPremium,
      defaultPremiumRounds,
      defaultCaseLink.defaultAssetType,
      { from: accounts[2] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseLink.defaultSellerDeposit, {
      from: accounts[3],
    });
    await cds.accept(defaultCaseLink.defaultInitAssetPrice, currentCDSId, {
      from: accounts[3],
    });
    await cds.close(currentCDSId, { from: accounts[2] });
    console.log('--case 6 of link created');

    console.log('case 6 complete!');

    // case7 - btc: account[4] creates and account[2] accepts
    // account[4] pays single round premium
    await fusd.approve(cds.address, defaultCaseBTC.defaultBuyerDeposit, {
      from: accounts[4],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseBTC.defaultInitAssetPrice,
      defaultCaseBTC.defaultClaimPrice,
      defaultCaseBTC.defaultLiquidationPrice,
      defaultCaseBTC.defaultSellerDeposit,
      defaultCaseBTC.defaultPremium,
      defaultPremiumRounds,
      defaultCaseBTC.defaultAssetType,
      { from: accounts[4] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseBTC.defaultSellerDeposit, {
      from: accounts[2],
    });
    await cds.accept(defaultCaseBTC.defaultInitAssetPrice, currentCDSId, {
      from: accounts[2],
    });
    await fusd.approve(cds.address, defaultCaseBTC.defaultPremium, {
      from: accounts[4],
    });
    await cds.payPremium(currentCDSId, { from: accounts[4] });
    console.log('--case 7 of btc created');

    // case7 - eth: account[3] creates and account[1] accepts
    // account[3] pays single round premium
    await fusd.approve(cds.address, defaultCaseETH.defaultBuyerDeposit, {
      from: accounts[3],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseETH.defaultInitAssetPrice,
      defaultCaseETH.defaultClaimPrice,
      defaultCaseETH.defaultLiquidationPrice,
      defaultCaseETH.defaultSellerDeposit,
      defaultCaseETH.defaultPremium,
      defaultPremiumRounds,
      defaultCaseETH.defaultAssetType,
      { from: accounts[3] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseETH.defaultSellerDeposit, {
      from: accounts[1],
    });
    await cds.accept(defaultCaseETH.defaultInitAssetPrice, currentCDSId, {
      from: accounts[1],
    });
    await fusd.approve(cds.address, defaultCaseETH.defaultPremium, {
      from: accounts[3],
    });
    await cds.payPremium(currentCDSId, { from: accounts[3] });
    console.log('--case 7 of eth created');

    // case7 - link: account[2] creates and account[1] accepts
    // account[2] pays single round premium
    await fusd.approve(cds.address, defaultCaseLink.defaultBuyerDeposit, {
      from: accounts[2],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseLink.defaultInitAssetPrice,
      defaultCaseLink.defaultClaimPrice,
      defaultCaseLink.defaultLiquidationPrice,
      defaultCaseLink.defaultSellerDeposit,
      defaultCaseLink.defaultPremium,
      defaultPremiumRounds,
      defaultCaseLink.defaultAssetType,
      { from: accounts[2] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseLink.defaultSellerDeposit, {
      from: accounts[1],
    });
    await cds.accept(defaultCaseLink.defaultInitAssetPrice, currentCDSId, {
      from: accounts[1],
    });
    await fusd.approve(cds.address, defaultCaseLink.defaultPremium, {
      from: accounts[2],
    });
    await cds.payPremium(currentCDSId, { from: accounts[2] });
    console.log('--case 7 of link created');

    console.log('case 7 complete!');

    // case8 - btc: account[2] creates swap of 2 rounds and account[4] accepts
    // account[2] pays double rounds premium(including first one when accepted)
    const roundForExpire = 2;
    await fusd.approve(cds.address, defaultCaseBTC.defaultBuyerDeposit, {
      from: accounts[2],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseBTC.defaultInitAssetPrice,
      defaultCaseBTC.defaultClaimPrice,
      defaultCaseBTC.defaultLiquidationPrice,
      defaultCaseBTC.defaultSellerDeposit,
      defaultCaseBTC.defaultPremium,
      roundForExpire,
      defaultCaseBTC.defaultAssetType,
      { from: accounts[2] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseBTC.defaultSellerDeposit, {
      from: accounts[4],
    });
    await cds.accept(defaultCaseBTC.defaultInitAssetPrice, currentCDSId, {
      from: accounts[4],
    }); // current round is 1
    await fusd.approve(cds.address, defaultCaseBTC.defaultPremium, {
      from: accounts[2],
    });
    await cds.payPremium(currentCDSId, { from: accounts[2] }); // current round is 0
    await cds.expire(currentCDSId, { from: accounts[4] }); // seller calls expire

    console.log('--case 8 of btc created');

    // case8 - eth: account[1] creates swap of 2 rounds and account[4] accepts
    // account[1] pays double rounds premium(including first one when accepted)
    await fusd.approve(cds.address, defaultCaseETH.defaultBuyerDeposit, {
      from: accounts[1],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseETH.defaultInitAssetPrice,
      defaultCaseETH.defaultClaimPrice,
      defaultCaseETH.defaultLiquidationPrice,
      defaultCaseETH.defaultSellerDeposit,
      defaultCaseETH.defaultPremium,
      roundForExpire,
      defaultCaseETH.defaultAssetType,
      { from: accounts[1] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseETH.defaultSellerDeposit, {
      from: accounts[4],
    });
    await cds.accept(defaultCaseETH.defaultInitAssetPrice, currentCDSId, {
      from: accounts[4],
    }); // current round is 1
    await fusd.approve(cds.address, defaultCaseETH.defaultPremium, {
      from: accounts[1],
    });
    await cds.payPremium(currentCDSId, { from: accounts[1] }); // current round is 0
    await cds.expire(currentCDSId, { from: accounts[4] }); // seller calls expire

    console.log('--case 8 of eth created');

    // case8 - link: account[3] creates swap of 2 rounds and account[4] accepts
    // account[3] pays double rounds premium(including first one when accepted)
    await fusd.approve(cds.address, defaultCaseLink.defaultBuyerDeposit, {
      from: accounts[3],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseLink.defaultInitAssetPrice,
      defaultCaseLink.defaultClaimPrice,
      defaultCaseLink.defaultLiquidationPrice,
      defaultCaseLink.defaultSellerDeposit,
      defaultCaseLink.defaultPremium,
      roundForExpire,
      defaultCaseLink.defaultAssetType,
      { from: accounts[3] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseLink.defaultSellerDeposit, {
      from: accounts[4],
    });
    await cds.accept(defaultCaseLink.defaultInitAssetPrice, currentCDSId, {
      from: accounts[4],
    }); // current round is 1
    await fusd.approve(cds.address, defaultCaseLink.defaultPremium, {
      from: accounts[3],
    });
    await cds.payPremium(currentCDSId, { from: accounts[3] }); // current round is 0
    await cds.expire(currentCDSId, { from: accounts[4] }); // seller calls expire

    console.log('--case 8 of link created');

    console.log('case 8 complete!');

    // case9 - btc: account[3] creates swap and account[1] accepts
    // admin pays premium with buyer's deposit three times and seller calls expire
    await fusd.approve(cds.address, defaultCaseBTC.defaultBuyerDeposit, {
      from: accounts[3],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseBTC.defaultInitAssetPrice,
      defaultCaseBTC.defaultClaimPrice,
      defaultCaseBTC.defaultLiquidationPrice,
      defaultCaseBTC.defaultSellerDeposit,
      defaultCaseBTC.defaultPremium,
      defaultPremiumRounds,
      defaultCaseBTC.defaultAssetType,
      { from: accounts[3] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseBTC.defaultSellerDeposit, {
      from: accounts[1],
    });
    await cds.accept(defaultCaseBTC.defaultInitAssetPrice, currentCDSId, {
      from: accounts[1],
    });

    await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 2 * premium
    await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 1 * premium
    await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 0 * premium
    await cds.expire(currentCDSId, { from: accounts[1] }); // seller calls expire

    console.log('--case 9 of btc created');

    // case9 - eth: account[3] creates swap and account[4] accepts
    // admin pays premium with buyer's deposit three times and seller calls expire
    await fusd.approve(cds.address, defaultCaseETH.defaultBuyerDeposit, {
      from: accounts[3],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseETH.defaultInitAssetPrice,
      defaultCaseETH.defaultClaimPrice,
      defaultCaseETH.defaultLiquidationPrice,
      defaultCaseETH.defaultSellerDeposit,
      defaultCaseETH.defaultPremium,
      defaultPremiumRounds,
      defaultCaseETH.defaultAssetType,
      { from: accounts[3] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseETH.defaultSellerDeposit, {
      from: accounts[4],
    });
    await cds.accept(defaultCaseETH.defaultInitAssetPrice, currentCDSId, {
      from: accounts[4],
    });

    await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 2 * premium
    await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 1 * premium
    await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 0 * premium
    await cds.expire(currentCDSId, { from: accounts[4] }); // seller calls expire

    console.log('--case 9 of eth created');

    // case9 - link: account[1] creates swap and account[2] accepts
    // admin pays premium with buyer's deposit three times and seller calls expire
    await fusd.approve(cds.address, defaultCaseLink.defaultBuyerDeposit, {
      from: accounts[1],
    });
    await cds.create(
      defaultHostSetting,
      defaultCaseLink.defaultInitAssetPrice,
      defaultCaseLink.defaultClaimPrice,
      defaultCaseLink.defaultLiquidationPrice,
      defaultCaseLink.defaultSellerDeposit,
      defaultCaseLink.defaultPremium,
      defaultPremiumRounds,
      defaultCaseLink.defaultAssetType,
      { from: accounts[1] },
    );
    [currentCDSId] = await cds.getCDSId();
    await fusd.approve(cds.address, defaultCaseLink.defaultSellerDeposit, {
      from: accounts[2],
    });
    await cds.accept(defaultCaseLink.defaultInitAssetPrice, currentCDSId, {
      from: accounts[2],
    });

    await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 2 * premium
    await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 1 * premium
    await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 0 * premium
    await cds.expire(currentCDSId, { from: accounts[2] }); // seller calls expire

    console.log('--case 9 of link created');

    console.log('case 9 complete!');

    await priceOracleMock.setBTCPrice(2500000000000, { from: accounts[0] });
    await priceOracleMock.setETHPrice(160000000000, { from: accounts[0] });
    await priceOracleMock.setLinkPrice(750000000, { from: accounts[0] });
    console.log('set price of orcale to default value');
  } catch (err) {
    console.error(err);
  }
};
