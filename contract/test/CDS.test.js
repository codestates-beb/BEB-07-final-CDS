/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const truffleAssert = require('truffle-assertions');

const PriceOracleMock = artifacts.require('PriceOracleMock');
const CDS = artifacts.require('CDS');

contract('CDS', (accounts) => {
  let priceOracle;
  let cds;
  const defaultInitAssetPrice = 100;
  const defaultClaimPrice = 80;
  const defaultLiquidationPrice = 60;
  const defaultSellerDeposit = 60;
  const defaultPremium = 4;
  const defaultPremiumInterval = 60 * 10; // 10 minutes
  const defaultPremiumRounds = 12; // total lifecycle of test cds is 2hrs

  const defaultBuyerDeposit = 10 ** 18 * defaultPremium * 3;

  beforeEach(async () => {
    priceOracle = await PriceOracleMock.new(defaultInitAssetPrice, {
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
    await assert.strictEqual(defaultInitAssetPrice, currentPrice.toNumber());
  });

  it('should throw error when invalid input or deposit provided to makeswap', async () => {
    await truffleAssert.fails(
      cds.makeSwap(
        accounts[2],
        20000,
        15000,
        10000,
        100000,
        -3000,
        60 * 10,
        12,
      ),
    );
    await truffleAssert.fails(
      cds.makeSwap(
        accounts[2],
        20000,
        15000,
        10000,
        100000,
        -3000,
        60 * 10,
        -12,
      ),
    );
    await truffleAssert.fails(
      cds.makeSwap(
        accounts[2],
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[2], value: 10 ** 18 * (defaultPremium + 1) * 3 },
      ),
    );
  });

  it('should be able to makeSwap when valid input provided and check it from mapping', async () => {
    await truffleAssert.passes(
      cds.makeSwap(
        accounts[2],
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[2], value: defaultBuyerDeposit },
      ),
    );
    const [currentSwapId] = await cds.getSwapId();
    const currentSwap = await cds.getSwap(currentSwapId);
    const {
      buyer,
      seller,
      initAssetPrice,
      claimPrice,
      liquidationPrice,
      premium,
      premiumInterval,
      totalPremiumRounds,
    } = currentSwap;

    await assert.strictEqual(defaultInitAssetPrice, +initAssetPrice);
    await assert.strictEqual(defaultClaimPrice, +claimPrice);
    await assert.strictEqual(defaultLiquidationPrice, +liquidationPrice);
    await assert.strictEqual(defaultPremium, +premium);
    await assert.strictEqual(defaultPremiumInterval, +premiumInterval);
    await assert.strictEqual(defaultPremiumRounds, +totalPremiumRounds);

    await assert.strictEqual(buyer.addr, accounts[2]);
    await assert.strictEqual(
      seller.addr,
      '0x0000000000000000000000000000000000000000',
    );
  });

  it('should be able to accept Swap when valid deposit provided and check it from mapping', async () => {
    await cds.makeSwap(
      accounts[2],
      defaultInitAssetPrice,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
      { from: accounts[2], value: defaultBuyerDeposit },
    );
    const [currentSwapId] = await cds.getSwapId();

    await truffleAssert.passes(
      cds.acceptSwap(accounts[1], currentSwapId, {
        from: accounts[1],
        value: 10 ** 18 * defaultSellerDeposit,
      }),
    );

    const currentSwap = await cds.getSwap(currentSwapId);
    const {
      buyer,
      seller,
      initAssetPrice,
      claimPrice,
      liquidationPrice,
      premium,
      premiumInterval,
      totalPremiumRounds,
    } = currentSwap;

    await assert.strictEqual(defaultInitAssetPrice, +initAssetPrice);
    await assert.strictEqual(defaultClaimPrice, +claimPrice);
    await assert.strictEqual(defaultLiquidationPrice, +liquidationPrice);
    await assert.strictEqual(defaultPremium, +premium);
    await assert.strictEqual(defaultPremiumInterval, +premiumInterval);
    await assert.strictEqual(defaultPremiumRounds, +totalPremiumRounds);

    await assert.strictEqual(buyer.addr, accounts[2]);
    await assert.notStrictEqual(
      seller.addr,
      '0x0000000000000000000000000000000000000000',
    );
    await assert.strictEqual(seller.addr, accounts[1]);
  });

  it('should throw error if owner is different', async () => {
    const ownerAddr = await cds.owner();
    await assert.strictEqual(accounts[0], ownerAddr);
  });

  it('should throw error when owner calls makeswap', async () => {
    await truffleAssert.fails(
      cds.makeSwap(
        accounts[0],
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumInterval,
        defaultPremiumRounds,
        { from: accounts[0], value: defaultBuyerDeposit },
      ),
    );
  });

  it('should throw error if the seller provides invalid deposit', async () => {
    await cds.makeSwap(
      accounts[2],
      defaultInitAssetPrice,
      defaultClaimPrice,
      defaultLiquidationPrice,
      defaultSellerDeposit,
      defaultPremium,
      defaultPremiumInterval,
      defaultPremiumRounds,
      { from: accounts[2], value: defaultBuyerDeposit },
    );
    const [currentSwapId] = await cds.getSwapId();

    await truffleAssert.fails(
      cds.acceptSwap(accounts[1], currentSwapId, {
        from: accounts[1],
        value: 10 ** 18 * (defaultSellerDeposit + 1),
      }),
    );
  });
});