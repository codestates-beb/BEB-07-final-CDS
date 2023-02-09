/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const truffleAssert = require('truffle-assertions');

const PriceOracleMock = artifacts.require('PriceOracleMock');

contract('PriceOracleMock', (accounts) => {
  const initialPrice = 10000;
  beforeEach(async () => {
    priceOracle = await PriceOracleMock.new(
      initialPrice,
      initialPrice,
      initialPrice,
      {
        from: accounts[0],
      },
    );
  });

  describe('Oracle Values', () => {
    it('should have proper initial value', async () => {
      const currentPrice = await priceOracle.btcPrice();
      await assert.strictEqual(initialPrice, currentPrice.toNumber());
    });

    it('should have proper changed value', async () => {
      let changedPrice = 9999;
      await priceOracle.setBTCPrice(changedPrice);
      let currentPrice = await priceOracle.btcPrice();
      await assert.strictEqual(changedPrice, currentPrice.toNumber());

      changedPrice = 12390123;
      await priceOracle.setBTCPrice(changedPrice);
      currentPrice = await priceOracle.btcPrice();
      await assert.strictEqual(changedPrice, currentPrice.toNumber());
    });

    it('should throw error when invalid input provided', async () => {
      const wrongInput = -1;
      await truffleAssert.fails(priceOracle.setBTCPrice(wrongInput));
    });
  });
});
