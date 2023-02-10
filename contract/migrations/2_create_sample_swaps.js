// this script migrates EWEToken
const CDS = artifacts.require('CDS');
const PriceOracleMock = artifacts.require('PriceOracleMock');
const FUSD = artifacts.require('FUSD');

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

let currentSwapId;
module.exports = async function (deployer, network, accounts) {
  console.log(`Triggering Initial TXs ON : ** ${network.toUpperCase()} **`);
  try {
    const priceOracleMock = await PriceOracleMock.at(PRICE_ORACLE_ADDRESS);
    const fusd = await FUSD.at(FUSD_ADDRESS);

    await fusd.transfer(accounts[1], defaultTokenFaucet, { from: accounts[0] });
    await fusd.transfer(accounts[2], defaultTokenFaucet, { from: accounts[0] });
    await fusd.transfer(accounts[3], defaultTokenFaucet, { from: accounts[0] });
    await fusd.transfer(accounts[4], defaultTokenFaucet, { from: accounts[0] });
    // settings
    const cds = await CDS.deployed();
    // case1: account[2] create, account[1] accepts
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
    [currentSwapId] = await cds.getSwapId();
    await fusd.approve(cds.address, defaultCaseBTC.defaultSellerDeposit, {
      from: accounts[1],
    });
    await cds.accept(defaultCaseBTC.defaultInitAssetPrice, currentSwapId, {
      from: accounts[1],
    });
    console.log('--case 1 of btc created');

    // ETH
    await fusd.approve(cds.address, defaultCaseETH.defaultBuyerDeposit, {
      from: accounts[2],
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
      { from: accounts[2] },
    );
    [currentSwapId] = await cds.getSwapId();
    await fusd.approve(cds.address, defaultCaseETH.defaultSellerDeposit, {
      from: accounts[1],
    });
    await cds.accept(defaultCaseETH.defaultInitAssetPrice, currentSwapId, {
      from: accounts[1],
    });
    console.log('--case 1 of eth created');

    // Link
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
    [currentSwapId] = await cds.getSwapId();
    await fusd.approve(cds.address, defaultCaseLink.defaultSellerDeposit, {
      from: accounts[1],
    });
    await cds.accept(defaultCaseLink.defaultInitAssetPrice, currentSwapId, {
      from: accounts[1],
    });
    console.log('--case 1 of link created');
    console.log('case 1 complete!');

    // case2: account[2] create and cancel
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
    [currentSwapId] = await cds.getSwapId();
    await cds.cancel(currentSwapId, { from: accounts[2] });
    console.log('--case 2 of btc created');

    // ETH
    await fusd.approve(cds.address, defaultCaseETH.defaultBuyerDeposit, {
      from: accounts[2],
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
      { from: accounts[2] },
    );
    [currentSwapId] = await cds.getSwapId();
    await cds.cancel(currentSwapId, { from: accounts[2] });
    console.log('--case 2 of eth created');

    // LINK
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
    [currentSwapId] = await cds.getSwapId();
    await cds.cancel(currentSwapId, { from: accounts[2] });
    console.log('--case 2 of link created');
    console.log('case 2 complete!');

    // case3 : account[4] creates and nobody accepts
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

    // ETH
    await fusd.approve(cds.address, defaultCaseETH.defaultBuyerDeposit, {
      from: accounts[4],
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
      { from: accounts[4] },
    );
    console.log('--case 3 of eth created');

    // LINK
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
    console.log('--case 3 of link created');
    console.log('case 3 complete!');

    // case4: account[3] creates and account[1] accepts
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
    [currentSwapId] = await cds.getSwapId();
    await fusd.approve(cds.address, defaultCaseBTC.defaultSellerDeposit, {
      from: accounts[1],
    });
    await cds.accept(defaultCaseBTC.defaultInitAssetPrice, currentSwapId, {
      from: accounts[1],
    });
    await priceOracleMock.setBTCPrice(2100000000000, { from: accounts[0] });
    await cds.claim(currentSwapId, { from: accounts[3] });
    console.log('--case 4 of btc created');

    // ETH
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
    [currentSwapId] = await cds.getSwapId();
    await fusd.approve(cds.address, defaultCaseETH.defaultSellerDeposit, {
      from: accounts[1],
    });
    await cds.accept(defaultCaseETH.defaultInitAssetPrice, currentSwapId, {
      from: accounts[1],
    });
    await priceOracleMock.setETHPrice(130000000000, { from: accounts[0] });
    await cds.claim(currentSwapId, { from: accounts[3] });
    console.log('--case 4 of eth created');

    // LINK
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
    [currentSwapId] = await cds.getSwapId();
    await fusd.approve(cds.address, defaultCaseLink.defaultSellerDeposit, {
      from: accounts[1],
    });
    await cds.accept(defaultCaseLink.defaultInitAssetPrice, currentSwapId, {
      from: accounts[1],
    });
    await priceOracleMock.setLinkPrice(550000000, { from: accounts[0] });
    await cds.claim(currentSwapId, { from: accounts[3] });
    console.log('--case 4 of eth created');

    console.log('case 4 complete');

    // case5: account[2] creates and account[3] accepts
    // after price dropped below liquidation price, account[2] claimes
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
    [currentSwapId] = await cds.getSwapId();
    await fusd.approve(cds.address, defaultCaseBTC.defaultSellerDeposit, {
      from: accounts[1],
    });
    await cds.accept(defaultCaseBTC.defaultInitAssetPrice, currentSwapId, {
      from: accounts[1],
    });
    await priceOracleMock.setBTCPrice(1900000000000, { from: accounts[0] });
    await cds.claim(currentSwapId, { from: accounts[3] });
    console.log('--case 5 of btc created');

    // ETH
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
    [currentSwapId] = await cds.getSwapId();
    await fusd.approve(cds.address, defaultCaseETH.defaultSellerDeposit, {
      from: accounts[1],
    });
    await cds.accept(defaultCaseETH.defaultInitAssetPrice, currentSwapId, {
      from: accounts[1],
    });
    await priceOracleMock.setETHPrice(110000000000, { from: accounts[0] });
    await cds.claim(currentSwapId, { from: accounts[3] });
    console.log('--case 5 of eth created');

    // Link
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
    [currentSwapId] = await cds.getSwapId();
    await fusd.approve(cds.address, defaultCaseLink.defaultSellerDeposit, {
      from: accounts[1],
    });
    await cds.accept(defaultCaseLink.defaultInitAssetPrice, currentSwapId, {
      from: accounts[1],
    });
    await priceOracleMock.setLinkPrice(400000000, { from: accounts[0] });
    await cds.claim(currentSwapId, { from: accounts[3] });
    console.log('--case 5 of link created');
    console.log('case 5 complete!');

    // case6: account[1] creates and account[3] accepts
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
    [currentSwapId] = await cds.getSwapId();
    await fusd.approve(cds.address, defaultCaseBTC.defaultSellerDeposit, {
      from: accounts[3],
    });
    await cds.accept(defaultCaseBTC.defaultInitAssetPrice, currentSwapId, {
      from: accounts[3],
    });
    await cds.close(currentSwapId, { from: accounts[1] });
    console.log('--case 6 of btc created');

    // ETH
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
    [currentSwapId] = await cds.getSwapId();
    await fusd.approve(cds.address, defaultCaseETH.defaultSellerDeposit, {
      from: accounts[3],
    });
    await cds.accept(defaultCaseETH.defaultInitAssetPrice, currentSwapId, {
      from: accounts[3],
    });
    await cds.close(currentSwapId, { from: accounts[1] });
    console.log('--case 6 of eth created');

    // Link
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
    [currentSwapId] = await cds.getSwapId();
    await fusd.approve(cds.address, defaultCaseLink.defaultSellerDeposit, {
      from: accounts[3],
    });
    await cds.accept(defaultCaseLink.defaultInitAssetPrice, currentSwapId, {
      from: accounts[3],
    });
    await cds.close(currentSwapId, { from: accounts[1] });
    console.log('--case 6 of link created');

    console.log('case 6 complete!');

    // case7: account[4] creates and account[2] accepts
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
    [currentSwapId] = await cds.getSwapId();
    await fusd.approve(cds.address, defaultCaseBTC.defaultSellerDeposit, {
      from: accounts[2],
    });
    await cds.accept(defaultCaseBTC.defaultInitAssetPrice, currentSwapId, {
      from: accounts[2],
    });
    await fusd.approve(cds.address, defaultCaseBTC.defaultPremium, {
      from: accounts[4],
    });
    await cds.payPremium(currentSwapId, { from: accounts[4] });
    console.log('--case 7 of btc created');

    // ETH
    await fusd.approve(cds.address, defaultCaseETH.defaultBuyerDeposit, {
      from: accounts[4],
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
      { from: accounts[4] },
    );
    [currentSwapId] = await cds.getSwapId();
    await fusd.approve(cds.address, defaultCaseETH.defaultSellerDeposit, {
      from: accounts[2],
    });
    await cds.accept(defaultCaseETH.defaultInitAssetPrice, currentSwapId, {
      from: accounts[2],
    });
    await fusd.approve(cds.address, defaultCaseETH.defaultPremium, {
      from: accounts[4],
    });
    await cds.payPremium(currentSwapId, { from: accounts[4] });
    console.log('--case 7 of eth created');

    // Link
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
    [currentSwapId] = await cds.getSwapId();
    await fusd.approve(cds.address, defaultCaseLink.defaultSellerDeposit, {
      from: accounts[2],
    });
    await cds.accept(defaultCaseLink.defaultInitAssetPrice, currentSwapId, {
      from: accounts[2],
    });
    await fusd.approve(cds.address, defaultCaseLink.defaultPremium, {
      from: accounts[4],
    });
    await cds.payPremium(currentSwapId, { from: accounts[4] });
    console.log('--case 7 of link created');

    console.log('case 7 complete!');
  } catch (err) {
    console.error(err);
  }
};
