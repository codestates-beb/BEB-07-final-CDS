/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const truffleAssert = require('truffle-assertions');

const PriceOracleMock = artifacts.require('PriceOracleMock');

contract('PriceOracleMock', async (accounts) => {
  const initialBTCPrice = 2500000000000;
  const initialETHPrice = 160000000000;
  const initialLinkPrice = 750000000;

  const priceOracle = await PriceOracleMock.new({ from: accounts[0] });

  describe('Oracle Values', () => {
    it('should have proper initial value', async () => {
      const currentBTCPrice = await priceOracle.btcPrice();
      const currentETHPrice = await priceOracle.ethPrice();
      const currentLinkPrice = await priceOracle.linkPrice();

      await assert.strictEqual(initialBTCPrice, currentBTCPrice.toNumber());
      await assert.strictEqual(initialETHPrice, currentETHPrice.toNumber());
      await assert.strictEqual(initialLinkPrice, currentLinkPrice.toNumber());
    });

    it('should have proper changed value', async () => {
      let changedPrice = 2200000000000;
      await priceOracle.setBTCPrice(changedPrice);
      let currentPrice = await priceOracle.btcPrice();
      await assert.strictEqual(changedPrice, currentPrice.toNumber());

      changedPrice = 120000000000;
      await priceOracle.setETHPrice(changedPrice);
      currentPrice = await priceOracle.ethPrice();
      await assert.strictEqual(changedPrice, currentPrice.toNumber());

      changedPrice = 800000000;
      await priceOracle.setLinkPrice(changedPrice);
      currentPrice = await priceOracle.linkPrice();
      await assert.strictEqual(changedPrice, currentPrice.toNumber());

      await priceOracle.setBTCPrice(initialBTCPrice);
      await priceOracle.setETHPrice(initialETHPrice);
      await priceOracle.setLinkPrice(initialLinkPrice);
    });

    it('should throw error when invalid input provided', async () => {
      const wrongInput = -1;
      await truffleAssert.fails(priceOracle.setBTCPrice(wrongInput));
    });
  });
});
