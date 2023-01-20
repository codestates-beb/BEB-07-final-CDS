/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const truffleAssert = require('truffle-assertions');

const PriceOracleMock = artifacts.require('PriceOracleMock');
const CDS = artifacts.require('CDS');

contract('CDS', (accounts) => {
  const initialPrice = 20000;
  let priceOracle;
  let cds;
  const defaultClaimPrice = 15000;
  const defaultLiquidationPrice = 10000;
  const defaultSellerDeposit = 100000;
  const defaultPremium = 3000;
  const defaultPremiumInterval = 60 * 10; // 10 minutes
  const defaultPremiumRounds = 12; // total lifecycle of test cds is 2hrs
  beforeEach(async () => {
    priceOracle = await PriceOracleMock.new(initialPrice, {
      from: accounts[0],
    });
    cds = await CDS.new({ from: accounts[0] });
  });

  it('should throw error if priceOrcle is not set', async () => {
    await truffleAssert.fails(cds.getPriceFromOracle());
  });

  it('should be able to set priceOracle and get value from it', async () => {
    await truffleAssert.passes(cds.setOracle(priceOracle.address));
    const currentPrice = await cds.getPriceFromOracle();
    await assert.strictEqual(initialPrice, currentPrice.toNumber());
  });

  it('should throw error when invalid input provided to makeswap', async () => {
    await truffleAssert.fails(
      cds.makeSwap(accounts[0], 15000, 10000, 100000, -3000, 60 * 10, 12),
    );
    await truffleAssert.fails(
      cds.makeSwap(accounts[0], 15000, 10000, 100000, -3000, 60 * 10, -12),
    );
  });

  it('should be able to makeSwap when valid input provided and check it from mapping', async () => {
    await truffleAssert.passes(
      cds.makeSwap(
        accounts[0],
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
      ),
    );
    const [currentSwapId] = await cds.getSwapId();
    const currentSwap = await cds.getSwap(currentSwapId);
    const {
      buyer,
      seller,
      claimPrice,
      liquidationPrice,
      premium,
      premiumInterval,
      totalPremiumRounds,
    } = currentSwap;

    await assert.strictEqual(defaultClaimPrice, +claimPrice);
    await assert.strictEqual(defaultLiquidationPrice, +liquidationPrice);
    await assert.strictEqual(defaultPremium, +premium);
    await assert.strictEqual(defaultPremiumInterval, +premiumInterval);
    await assert.strictEqual(defaultPremiumRounds, +totalPremiumRounds);

    await assert.strictEqual(buyer.addr, accounts[0]);
    await assert.strictEqual(
      seller.addr,
      '0x0000000000000000000000000000000000000000',
    );
  });

  it('should be able to accept Swap and check it from mapping', async () => {
    await cds.makeSwap(
      accounts[0],
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
    );
    const [currentSwapId] = await cds.getSwapId();

    await truffleAssert.passes(
      cds.acceptSwap(accounts[1], currentSwapId, { from: accounts[1] }),
    );

    const currentSwap = await cds.getSwap(currentSwapId);
    const {
      buyer,
      seller,
      claimPrice,
      liquidationPrice,
      premium,
      premiumInterval,
      totalPremiumRounds,
    } = currentSwap;

    await assert.strictEqual(defaultClaimPrice, +claimPrice);
    await assert.strictEqual(defaultLiquidationPrice, +liquidationPrice);
    await assert.strictEqual(defaultPremium, +premium);
    await assert.strictEqual(defaultPremiumInterval, +premiumInterval);
    await assert.strictEqual(defaultPremiumRounds, +totalPremiumRounds);

    await assert.strictEqual(buyer.addr, accounts[0]);
    await assert.notStrictEqual(
      seller.addr,
      '0x0000000000000000000000000000000000000000',
    );
    await assert.strictEqual(seller.addr, accounts[1]);
  });
});
