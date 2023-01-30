// this script migrates EWEToken
const CDS = artifacts.require('CDS');
const PriceOracleMock = artifacts.require('PriceOracleMock');

const defaultInitAssetPrice = 100;
const defaultAmountOfAssets = 10;
const defaultClaimPrice = 80;
const defaultLiquidationPrice = 60;
const defaultSellerDeposit = 400;
const defaultPremium = 4;
const defaultPremiumInterval = 60 * 10; // 10 minutes
const defaultPremiumRounds = 12; // total lifecycle of test cds is 2hrs
const defaultBuyerDeposit = defaultPremium * 3;

let currentSwapId;
module.exports = async function (deployer, network, accounts) {
  try {
    const priceOracleMock = await PriceOracleMock.deployed();
    // case1: account[2] create, account[1] accepts
    const cds = await CDS.deployed();
    await cds.setOracle(priceOracleMock.address);
    await cds.createSwap(
      accounts[2],
      defaultInitAssetPrice,
      defaultAmountOfAssets,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
      { from: accounts[2], value: defaultBuyerDeposit },
    );
    [currentSwapId] = await cds.getSwapId();
    await cds.acceptSwap(accounts[1], defaultInitAssetPrice, currentSwapId, {
      from: accounts[1],
      value: defaultSellerDeposit,
    });

    // case2: account[2] create and cancel
    await cds.createSwap(
      accounts[2],
      defaultInitAssetPrice,
      defaultAmountOfAssets,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
      { from: accounts[2], value: defaultBuyerDeposit },
    );
    [currentSwapId] = await cds.getSwapId();
    await cds.cancelSwap(currentSwapId, { from: accounts[2] });

    // case3 : account[4] creates and nobody accepts
    await cds.createSwap(
      accounts[4],
      defaultInitAssetPrice,
      defaultAmountOfAssets,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
      { from: accounts[4], value: defaultBuyerDeposit },
    );

    // case4: account[3] creates and account[1] accepts
    // after price dropped below claim price, account[3] claimes
    await cds.createSwap(
      accounts[3],
      defaultInitAssetPrice,
      defaultAmountOfAssets,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
      { from: accounts[3], value: defaultBuyerDeposit },
    );
    [currentSwapId] = await cds.getSwapId();
    await cds.acceptSwap(accounts[1], defaultInitAssetPrice, currentSwapId, {
      from: accounts[1],
      value: defaultSellerDeposit,
    });
    await priceOracleMock.setPrice(70, { from: accounts[0] });
    await cds.claimSwap(currentSwapId, { from: accounts[3] });

    // case5: account[2] creates and account[3] accepts
    // after price dropped below liquidation price, account[2] claimes
    await cds.createSwap(
      accounts[3],
      defaultInitAssetPrice,
      defaultAmountOfAssets,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
      { from: accounts[3], value: defaultBuyerDeposit },
    );
    [currentSwapId] = await cds.getSwapId();
    await cds.acceptSwap(accounts[1], defaultInitAssetPrice, currentSwapId, {
      from: accounts[1],
      value: defaultSellerDeposit,
    });
    await priceOracleMock.setPrice(70, { from: accounts[0] });
    await cds.claimSwap(currentSwapId, { from: accounts[3] });

    // case6: account[1] creates and account[3] accepts
    // account[1] closes swap
    await cds.createSwap(
      accounts[1],
      defaultInitAssetPrice,
      defaultAmountOfAssets,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
      { from: accounts[1], value: defaultBuyerDeposit },
    );
    [currentSwapId] = await cds.getSwapId();
    await cds.acceptSwap(accounts[3], defaultInitAssetPrice, currentSwapId, {
      from: accounts[3],
      value: defaultSellerDeposit,
    });
    await cds.closeSwap(currentSwapId, { from: accounts[1] });

    // case7: account[4] creates and account[2] accepts
    // account[4] pays single round premium
    await cds.createSwap(
      accounts[4],
      defaultInitAssetPrice,
      defaultAmountOfAssets,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
      { from: accounts[4], value: defaultBuyerDeposit },
    );
    [currentSwapId] = await cds.getSwapId();
    await cds.acceptSwap(accounts[2], defaultInitAssetPrice, currentSwapId, {
      from: accounts[2],
      value: defaultSellerDeposit,
    });
    await cds.payPremium(currentSwapId, {
      from: accounts[4],
      value: defaultPremium,
    });
  } catch (err) {
    console.error(err);
  }
};
