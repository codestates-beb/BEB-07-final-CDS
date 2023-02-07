// this script migrates EWEToken
const CDS = artifacts.require('CDS');
const PriceOracleMock = artifacts.require('PriceOracleMock');
const FUSD = artifacts.require('FUSD');

const defaultHostSetting = true;
const defaultInitAssetPrice = 25000;
const defaultClaimPrice = 21250;
const defaultLiquidationPrice = 20000;
const defaultSellerDeposit = 50000;
const defaultPremium = 750;
const defaultPremiumInterval = 60 * 10; // 10 minutes
const defaultPremiumRounds = 12; // total lifecycle of test cds is 2hrs
const defaultBuyerDeposit = defaultPremium * (3 + 1);
const defaultTokenFaucet = 10 ** 8;

let currentSwapId;
module.exports = async function (deployer, network, accounts) {
  console.log(`Triggering Initial TXs ON : ** ${network.toUpperCase()} **`);
  try {
    const priceOracleMock = await PriceOracleMock.deployed();
    // token faucet
    const fusd = await FUSD.deployed();
    await fusd.transfer(accounts[1], defaultTokenFaucet, { from: accounts[0] });
    await fusd.transfer(accounts[2], defaultTokenFaucet, { from: accounts[0] });
    await fusd.transfer(accounts[3], defaultTokenFaucet, { from: accounts[0] });
    await fusd.transfer(accounts[4], defaultTokenFaucet, { from: accounts[0] });

    // case1: account[2] create, account[1] accepts
    // 이제는 create, accept하려면 transfer 선행되야함... buyer 호출의 경우 4달분 cds ca로
    const cds = await CDS.deployed();
    await cds.setOracle(priceOracleMock.address);
    await cds.setToken(fusd.address);

    await fusd.transfer(cds.address, defaultPremium * 4);
    console.log(fusd.balanceOf(cds.address));

    await cds.create(
      defaultHostSetting,
      defaultInitAssetPrice,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
      { from: accounts[2], value: defaultBuyerDeposit },
    );
    [currentSwapId] = await cds.getSwapId();
    await cds.accept(defaultInitAssetPrice, currentSwapId, {
      from: accounts[1],
      value: defaultSellerDeposit,
    });
    console.log('case 1 created!');
    // case2: account[2] create and cancel
    await cds.create(
      defaultHostSetting,
      defaultInitAssetPrice,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
      { from: accounts[2], value: defaultBuyerDeposit },
    );
    [currentSwapId] = await cds.getSwapId();
    await cds.cancel(currentSwapId, { from: accounts[2] });

    console.log('case 2 created!');
    // case3 : account[4] creates and nobody accepts
    await cds.create(
      defaultHostSetting,
      defaultInitAssetPrice,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
      { from: accounts[4], value: defaultBuyerDeposit },
    );

    console.log('case 3 created!');
    // case4: account[3] creates and account[1] accepts
    // after price dropped below claim price, account[3] claimes
    await cds.create(
      defaultHostSetting,
      defaultInitAssetPrice,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
      { from: accounts[3], value: defaultBuyerDeposit },
    );
    [currentSwapId] = await cds.getSwapId();
    await cds.accept(defaultInitAssetPrice, currentSwapId, {
      from: accounts[1],
      value: defaultSellerDeposit,
    });
    await priceOracleMock.setPrice(70, { from: accounts[0] });
    await cds.claim(currentSwapId, { from: accounts[3] });

    console.log('case 4 created!');
    // case5: account[2] creates and account[3] accepts
    // after price dropped below liquidation price, account[2] claimes
    await cds.create(
      defaultHostSetting,
      defaultInitAssetPrice,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
      { from: accounts[3], value: defaultBuyerDeposit },
    );
    [currentSwapId] = await cds.getSwapId();
    await cds.accept(defaultInitAssetPrice, currentSwapId, {
      from: accounts[1],
      value: defaultSellerDeposit,
    });
    await priceOracleMock.setPrice(70, { from: accounts[0] });
    await cds.claim(currentSwapId, { from: accounts[3] });

    console.log('case 5 created!');
    // case6: account[1] creates and account[3] accepts
    // account[1] closes swap
    await cds.create(
      defaultHostSetting,
      defaultInitAssetPrice,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
      { from: accounts[1], value: defaultBuyerDeposit },
    );
    [currentSwapId] = await cds.getSwapId();
    await cds.accept(defaultInitAssetPrice, currentSwapId, {
      from: accounts[3],
      value: defaultSellerDeposit,
    });
    await cds.close(currentSwapId, { from: accounts[1] });

    console.log('case 6 created!');
    // case7: account[4] creates and account[2] accepts
    // account[4] pays single round premium
    await cds.create(
      defaultHostSetting,
      defaultInitAssetPrice,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
      { from: accounts[4], value: defaultBuyerDeposit },
    );
    [currentSwapId] = await cds.getSwapId();
    await cds.accept(defaultInitAssetPrice, currentSwapId, {
      from: accounts[2],
      value: defaultSellerDeposit,
    });
    await cds.payPremium(currentSwapId, {
      from: accounts[4],
      value: defaultPremium,
    });
    console.log('case 7 created!');
  } catch (err) {
    console.error(err);
  }
};
