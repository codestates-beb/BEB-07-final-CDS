/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const truffleAssert = require('truffle-assertions');

const PriceOracleMock = artifacts.require('PriceOracleMock');
const FUSD = artifacts.require('FUSD');
const CDS = artifacts.require('CDS');

contract('CDS', (accounts) => {
  let priceOracle;
  let cds;
  let fusd;
  const defaultHostSetting = true;
  const defaultInitAssetPrice = 25000;
  const defaultClaimPrice = 21250;
  const defaultLiquidationPrice = 20000;
  const defaultSellerDeposit = 50000;
  const defaultPremium = 750;
  const defaultPremiumRounds = 12; // total lifecycle of test cds is 2hrs
  const defaultBuyerDeposit = defaultPremium * (3 + 1);
  const defaultTokenFaucet = '10000000';

  beforeEach(async () => {
    priceOracle = await PriceOracleMock.new(defaultInitAssetPrice, {
      from: accounts[0],
    });
    cds = await CDS.new({ from: accounts[0] });
    fusd = await FUSD.new({ from: accounts[0] });
    await cds.setOracle(priceOracle.address, { from: accounts[0] });
    await cds.setToken(fusd.address, { from: accounts[0] });

    await fusd.transfer(accounts[1], defaultTokenFaucet, { from: accounts[0] });
    await fusd.transfer(accounts[2], defaultTokenFaucet, { from: accounts[0] });
    await fusd.transfer(accounts[3], defaultTokenFaucet, { from: accounts[0] });
    await fusd.transfer(accounts[4], defaultTokenFaucet, { from: accounts[0] });
  });

  describe('Price Oracle', () => {
    it('should throw error if priceOracle is not set', async () => {
      const priceOracleSetted = await cds.priceOracle();
      await assert.strictEqual(priceOracleSetted, priceOracle.address);
    });

    it('should be able to set priceOracle and get value from it', async () => {
      await truffleAssert.passes(await cds.setOracle(priceOracle.address));
      const currentPrice = await priceOracle.price();
      await assert.strictEqual(defaultInitAssetPrice, currentPrice.toNumber());
    });
  });

  describe('Owner Check', () => {
    it('should throw error if owner is different', async () => {
      const ownerAddr = await cds.owner();
      await assert.strictEqual(accounts[0], ownerAddr);
    });
  });

  describe('Create', () => {
    it('should throw error when invalid input', async () => {
      await truffleAssert.fails(
        cds.create(true, 20000, 21250, 20000, 50000, -750, 60 * 10, 12, {
          from: accounts[2],
        }),
      );
      await truffleAssert.fails(
        cds.create(true, 20000, 21250, 20000, 100000, 750, 60 * 10, -12, {
          from: accounts[2],
        }),
      );
    });

    it('should throw error when invalid deposit approved', async () => {
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[2],
      });
      await truffleAssert.fails(
        cds.create(
          defaultHostSetting,
          defaultInitAssetPrice,
          defaultClaimPrice,
          defaultLiquidationPrice,
          defaultSellerDeposit,
          defaultPremium,
          defaultPremiumRounds,
          { from: accounts[2] },
        ),
      );

      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[1],
      });
      await truffleAssert.fails(
        cds.create(
          !defaultHostSetting,
          defaultInitAssetPrice,
          defaultClaimPrice,
          defaultLiquidationPrice,
          defaultSellerDeposit,
          defaultPremium,
          defaultPremiumRounds,
          { from: accounts[1] },
        ),
      );
    });

    it('should be able to create Swap as BUYER when valid input approved and check it from mapping', async () => {
      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[2],
      });
      await truffleAssert.passes(
        await cds.create(
          defaultHostSetting,
          defaultInitAssetPrice,
          defaultClaimPrice,
          defaultLiquidationPrice,
          defaultSellerDeposit,
          defaultPremium,
          defaultPremiumRounds,
          { from: accounts[2] },
        ),
      );
      const [currentSwapId] = await cds.getSwapId();
      const buyer = await cds.getBuyer(currentSwapId);
      const seller = await cds.getSeller(currentSwapId);
      const buyerDepositDetail = await cds.deposits(currentSwapId, 0);
      const sellerDepositDetail = await cds.deposits(currentSwapId, 1);
      const totalRounds = await cds.getRounds(currentSwapId);

      const currentSwap = await cds.getPrices(currentSwapId);
      const [
        initAssetPrice,
        claimPrice,
        liquidationPrice,
        premium,
        sellerDeposit,
      ] = currentSwap;

      await assert.strictEqual(defaultInitAssetPrice, +initAssetPrice);
      await assert.strictEqual(defaultClaimPrice, +claimPrice);
      await assert.strictEqual(defaultLiquidationPrice, +liquidationPrice);
      await assert.strictEqual(defaultSellerDeposit, +sellerDeposit);
      await assert.strictEqual(defaultPremium, +premium);

      await assert.strictEqual(buyer, accounts[2]);
      await assert.strictEqual(+buyerDepositDetail, defaultBuyerDeposit);

      await assert.strictEqual(
        seller,
        '0x0000000000000000000000000000000000000000',
      );
      await assert.strictEqual(+sellerDepositDetail, 0);

      await assert.strictEqual(defaultPremiumRounds, +totalRounds);
    });

    it('should be able to create Swap as SELLER when valid input provided and check it from mapping', async () => {
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await truffleAssert.passes(
        cds.create(
          !defaultHostSetting,
          defaultInitAssetPrice,
          defaultClaimPrice,
          defaultLiquidationPrice,
          defaultSellerDeposit,
          defaultPremium,
          defaultPremiumRounds,
          { from: accounts[1] },
        ),
      );
      const [currentSwapId] = await cds.getSwapId();
      const buyer = await cds.getBuyer(currentSwapId);
      const seller = await cds.getSeller(currentSwapId);
      const buyerDepositDetail = await cds.deposits(currentSwapId, 0);
      const sellerDepositDetail = await cds.deposits(currentSwapId, 1);
      const totalRounds = await cds.getRounds(currentSwapId);

      const currentSwap = await cds.getPrices(currentSwapId);
      const [
        initAssetPrice,
        claimPrice,
        liquidationPrice,
        premium,
        sellerDeposit,
      ] = currentSwap;

      await assert.strictEqual(defaultInitAssetPrice, +initAssetPrice);
      await assert.strictEqual(defaultClaimPrice, +claimPrice);
      await assert.strictEqual(defaultLiquidationPrice, +liquidationPrice);
      await assert.strictEqual(defaultSellerDeposit, +sellerDeposit);
      await assert.strictEqual(defaultPremium, +premium);

      await assert.strictEqual(seller, accounts[1]);
      await assert.strictEqual(+sellerDepositDetail, defaultSellerDeposit);
      await assert.strictEqual(
        buyer,
        '0x0000000000000000000000000000000000000000',
      );
      await assert.strictEqual(+buyerDepositDetail, 0);

      await assert.strictEqual(defaultPremiumRounds, +totalRounds);
    });

    it('should have decreased TOKEN amount of buyer after creating swap as BUYER', async () => {
      const before = await fusd.balanceOf(accounts[2]);
      const beforeCA = await fusd.balanceOf(cds.address);
      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[2],
      });
      await cds.create(
        defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumRounds,
        { from: accounts[2] },
      );
      const after = await fusd.balanceOf(accounts[2]);
      const afterCA = await fusd.balanceOf(cds.address);

      assert.isBelow(
        +after,
        +before,
        'After Balance should be lower than Before',
      );
      assert.equal(
        +before,
        +after + defaultBuyerDeposit,
        'Sum of gas cost, msg.value, after balance should be equal to Before Balance',
      );
      await assert.strictEqual(+beforeCA + defaultBuyerDeposit, +afterCA);
    });

    it('should have decreased TOKEN amount of seller after creating swap as SELLER', async () => {
      const before = await fusd.balanceOf(accounts[1]);
      const beforeCA = await fusd.balanceOf(cds.address);
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.create(
        !defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumRounds,
        { from: accounts[1] },
      );
      const after = await fusd.balanceOf(accounts[1]);
      const afterCA = await fusd.balanceOf(cds.address);

      assert.isBelow(
        +after,
        +before,
        'After Balance should be lower than Before',
      );
      assert.equal(
        +before,
        +after + defaultSellerDeposit,
        'Sum of gas cost, msg.value, after balance should be equal to Before Balance',
      );
      await assert.strictEqual(+beforeCA + defaultSellerDeposit, +afterCA);
    });
  });

  describe('Accept', () => {
    it('should be able to accept Swap as SELLER when valid deposit provided and check it from mapping', async () => {
      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[2],
      });
      await cds.create(
        defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumRounds,
        { from: accounts[2] },
      );

      const [currentSwapId] = await cds.getSwapId();

      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await truffleAssert.passes(
        cds.accept(defaultInitAssetPrice, currentSwapId, { from: accounts[1] }),
        'accepting',
      );

      const buyer = await cds.getBuyer(currentSwapId);
      const seller = await cds.getSeller(currentSwapId);
      const buyerDepositDetail = await cds.deposits(currentSwapId, 0);
      const sellerDepositDetail = await cds.deposits(currentSwapId, 1);
      const currRounds = await cds.getRounds(currentSwapId);

      const currentSwap = await cds.getPrices(currentSwapId);
      const [
        initAssetPrice,
        claimPrice,
        liquidationPrice,
        premium,
        sellerDeposit,
      ] = currentSwap;

      await assert.strictEqual(defaultInitAssetPrice, +initAssetPrice);
      await assert.strictEqual(defaultClaimPrice, +claimPrice);
      await assert.strictEqual(defaultLiquidationPrice, +liquidationPrice);
      await assert.strictEqual(defaultSellerDeposit, +sellerDeposit);
      await assert.strictEqual(defaultPremium, +premium);

      await assert.strictEqual(buyer, accounts[2]);
      await assert.strictEqual(
        +buyerDepositDetail,
        defaultBuyerDeposit - defaultPremium,
      );

      await assert.strictEqual(seller, accounts[1]);
      await assert.strictEqual(+sellerDepositDetail, defaultSellerDeposit);

      await assert.strictEqual(defaultPremiumRounds, +currRounds + 1);
    });

    it('should be able to accept Swap as BUYER when valid deposit provided and check it from mapping', async () => {
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.create(
        !defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumRounds,
        { from: accounts[1] },
      );

      const [currentSwapId] = await cds.getSwapId();

      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[2],
      });
      await truffleAssert.passes(
        cds.accept(defaultInitAssetPrice, currentSwapId, { from: accounts[2] }),
        'accepting',
      );

      const buyer = await cds.getBuyer(currentSwapId);
      const seller = await cds.getSeller(currentSwapId);
      const buyerDepositDetail = await cds.deposits(currentSwapId, 0);
      const sellerDepositDetail = await cds.deposits(currentSwapId, 1);
      const currRounds = await cds.getRounds(currentSwapId);

      const currentSwap = await cds.getPrices(currentSwapId);
      const [
        initAssetPrice,
        claimPrice,
        liquidationPrice,
        premium,
        sellerDeposit,
      ] = currentSwap;

      await assert.strictEqual(defaultInitAssetPrice, +initAssetPrice);
      await assert.strictEqual(defaultClaimPrice, +claimPrice);
      await assert.strictEqual(defaultLiquidationPrice, +liquidationPrice);
      await assert.strictEqual(defaultSellerDeposit, +sellerDeposit);
      await assert.strictEqual(defaultPremium, +premium);

      await assert.strictEqual(buyer, accounts[2]);
      await assert.strictEqual(
        +buyerDepositDetail,
        defaultBuyerDeposit - defaultPremium,
      );

      await assert.strictEqual(seller, accounts[1]);
      await assert.strictEqual(+sellerDepositDetail, defaultSellerDeposit);

      await assert.strictEqual(defaultPremiumRounds, +currRounds + 1);
    });

    it('should throw error if the seller approved invalid deposit', async () => {
      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[2],
      });
      await cds.create(
        defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumRounds,
        { from: accounts[2] },
      );

      const [currentSwapId] = await cds.getSwapId();

      await fusd.approve(cds.address, defaultSellerDeposit + 1, {
        from: accounts[1],
      });
      await truffleAssert.fails(
        cds.accept(defaultInitAssetPrice, currentSwapId, { from: accounts[1] }),
      );
    });

    it('should throw error if the buyer provides invalid deposit', async () => {
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.create(
        !defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumRounds,
        { from: accounts[1] },
      );

      const [currentSwapId] = await cds.getSwapId();

      await fusd.approve(cds.address, defaultBuyerDeposit + 1, {
        from: accounts[2],
      });

      await truffleAssert.fails(
        cds.accept(defaultInitAssetPrice, currentSwapId, { from: accounts[2] }),
      );
    });

    it('should throw error if the host accepts the swap', async () => {
      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[2],
      });
      await cds.create(
        defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumRounds,
        { from: accounts[2] },
      );

      let [currentSwapId] = await cds.getSwapId();

      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[2],
      });

      await truffleAssert.fails(
        cds.accept(defaultInitAssetPrice, currentSwapId, { from: accounts[2] }),
      );

      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.create(
        !defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumRounds,
        { from: accounts[1] },
      );

      [currentSwapId] = await cds.getSwapId();

      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[1],
      });
      await truffleAssert.fails(
        cds.accept(defaultInitAssetPrice, currentSwapId, { from: accounts[1] }),
      );
    });

    it('should have right TOKEN amount of seller after accepting swap as SELLER', async () => {
      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[2],
      });
      await cds.create(
        defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumRounds,
        { from: accounts[2] },
      );

      const [currentSwapId] = await cds.getSwapId();

      const before = await fusd.balanceOf(accounts[1]);
      const beforeCA = await fusd.balanceOf(cds.address);
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
      });
      const after = await fusd.balanceOf(accounts[1]);
      const afterCA = await fusd.balanceOf(cds.address);

      await assert.strictEqual(
        +before,
        +after + defaultSellerDeposit - defaultPremium,
      );
      await assert.strictEqual(
        +beforeCA,
        +afterCA - defaultSellerDeposit + defaultPremium,
      );
    });

    it('should have right TOKEN amount of buyer after accepting swap as BUYER', async () => {
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.create(
        !defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumRounds,
        { from: accounts[1] },
      );

      const [currentSwapId] = await cds.getSwapId();

      const before = await fusd.balanceOf(accounts[2]);
      const beforeCA = await fusd.balanceOf(cds.address);
      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[2],
      });
      await cds.accept(defaultInitAssetPrice, currentSwapId, {
        from: accounts[2],
      });
      const after = await fusd.balanceOf(accounts[2]);
      const afterCA = await fusd.balanceOf(cds.address);

      await assert.strictEqual(+before, +after + defaultBuyerDeposit);
      await assert.strictEqual(
        +beforeCA,
        +afterCA - defaultBuyerDeposit + defaultPremium,
      );
    });
  });

  describe('Cancel from BUYER', async () => {
    beforeEach(async () => {
      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[2],
      });
      await cds.create(
        defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumRounds,
        { from: accounts[2] },
      );
    });

    it('should throw error if the caller of cancel is not the buyer/seller', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await truffleAssert.fails(
        cds.cancel(currentSwapId, { from: accounts[3] }),
      );
    });

    it('should be able to cancel if the buyer calls cancel and check the swap', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await truffleAssert.passes(
        cds.cancel(currentSwapId, { from: accounts[2] }),
      );
      const buyerDepositDetail = await cds.deposits(currentSwapId, 0);
      const swapStatus = await cds.getStatus(currentSwapId);

      await assert.strictEqual(+buyerDepositDetail, 0);
      await assert.strictEqual(0, +swapStatus); // inactive => 0
    });

    it('should have decreased amount of TOKEN after buyer calling cancel', async () => {
      const before = await fusd.balanceOf(accounts[2]);
      const beforeCA = await fusd.balanceOf(cds.address);

      const [currentSwapId] = await cds.getSwapId();
      await cds.cancel(currentSwapId, { from: accounts[2] });

      const after = await fusd.balanceOf(accounts[2]);
      const afterCA = await fusd.balanceOf(cds.address);

      await assert.strictEqual(+before, +after - defaultBuyerDeposit);
      await assert.strictEqual(+beforeCA, +afterCA + defaultBuyerDeposit);
    });
  });

  describe('Cancel from SELLER', async () => {
    beforeEach(async () => {
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.create(
        !defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumRounds,
        { from: accounts[1] },
      );
    });

    it('should throw error if the caller of cancel is not the buyer/seller', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await truffleAssert.fails(
        cds.cancel(currentSwapId, { from: accounts[3] }),
      );
    });

    it('should be able to cancel if the seller calls cancel and check the swap', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await truffleAssert.passes(
        cds.cancel(currentSwapId, { from: accounts[1] }),
      );
      const sellerDepositDetail = await cds.deposits(currentSwapId, 1);
      const swapStatus = await cds.getStatus(currentSwapId);

      await assert.strictEqual(+sellerDepositDetail, 0);
      await assert.strictEqual(0, +swapStatus); // inactive => 0
    });

    it('should have decreased amount of TOKEN after seller calling cancel', async () => {
      const before = await fusd.balanceOf(accounts[1]);
      const beforeCA = await fusd.balanceOf(cds.address);

      const [currentSwapId] = await cds.getSwapId();
      await cds.cancel(currentSwapId, { from: accounts[1] });

      const after = await fusd.balanceOf(accounts[2]);
      const afterCA = await fusd.balanceOf(cds.address);

      await assert.strictEqual(+before, +after - defaultSellerDeposit);
      await assert.strictEqual(+beforeCA, +afterCA + defaultSellerDeposit);
    });
  });

  describe('Close', async () => {
    beforeEach(async () => {
      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[2],
      });
      await cds.create(
        defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumRounds,
        { from: accounts[2] },
      );
    });

    it('should throw error if the status is not active', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await truffleAssert.fails(
        cds.close(currentSwapId, { from: accounts[2] }),
      );
    });

    it('should throw error if the caller is not the buyer', async () => {
      const [currentSwapId] = await cds.getSwapId();

      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
      });

      await truffleAssert.fails(
        cds.close(currentSwapId, { from: accounts[1] }),
      );
    });

    it('should be able to close if the buyer calls close and check the state of the swap', async () => {
      const [currentSwapId] = await cds.getSwapId();

      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
      });

      await truffleAssert.passes(
        cds.close(currentSwapId, { from: accounts[2] }),
      );

      const buyerDepositDetail = await cds.deposits(currentSwapId, 0);
      const sellerDepositDetail = await cds.deposits(currentSwapId, 1);
      const swapStatus = await cds.getStatus(currentSwapId);

      await assert.strictEqual(+buyerDepositDetail, 0);
      await assert.strictEqual(+sellerDepositDetail, 0);
      await assert.strictEqual(4, +swapStatus); // expired => 4
    });

    it('should have proper amount of balance after close is called', async () => {
      const [currentSwapId] = await cds.getSwapId();

      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
      });

      const balanceBeforeClose = {
        buyer: +(await fusd.balanceOf(accounts[2])),
        seller: +(await fusd.balanceOf(accounts[1])),
        contract: +(await fusd.balanceOf(cds.address)),
      };

      await truffleAssert.passes(
        cds.close(currentSwapId, { from: accounts[2] }),
      );

      const balanceAfterClose = {
        buyer: +(await fusd.balanceOf(accounts[2])),
        seller: +(await fusd.balanceOf(accounts[1])),
        contract: +(await fusd.balanceOf(cds.address)),
      };
      // contract
      assert.equal(
        balanceBeforeClose.contract,
        balanceAfterClose.contract +
          (defaultBuyerDeposit - defaultPremium) +
          defaultSellerDeposit,
      );
      // buyer
      assert.equal(
        balanceBeforeClose.buyer,
        balanceAfterClose.buyer - (defaultBuyerDeposit - defaultPremium),
      );
      // seller
      assert.equal(
        balanceBeforeClose.seller,
        balanceAfterClose.seller - defaultSellerDeposit,
      );
    });
  });

  describe('Claim', async () => {
    beforeEach(async () => {
      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[2],
      });
      await cds.create(
        defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumRounds,
        { from: accounts[2] },
      );
    });

    it('should throw error if the status of the swap is not active', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await truffleAssert.fails(
        cds.claim(currentSwapId, { from: accounts[2] }),
      );
    });

    it('should throw error if the method is not called by the buyer', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
      });

      const currPrice = 21000;
      await priceOracle.setPrice(currPrice, { from: accounts[0] });
      await truffleAssert.fails(
        cds.claim(currentSwapId, { from: accounts[1] }),
      );
    });

    // check proper return
    // claim when currPrice is above CP => 100
    it('should throw error if the current price of the asset is above the claim price', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
      });

      const currPrice = 22000;
      await priceOracle.setPrice(currPrice, { from: accounts[0] });

      await truffleAssert.fails(
        cds.claim(currentSwapId, { from: accounts[2] }),
      );
    });

    // claim when currPrice is btwn CP~LP => 21000, claimReward should be 40000
    it('should return proper status and reward if the current price of the asset is below claim price ', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
      });

      const changedPrice = 21000;
      const claimRewardIntended = 40000;
      await priceOracle.setPrice(changedPrice);

      const balanceBeforeClaim = {
        contract: +(await fusd.balanceOf(cds.address)),
        buyer: +(await fusd.balanceOf(accounts[2])),
        seller: +(await fusd.balanceOf(accounts[1])),
      };

      let claimReward = await cds.claim(currentSwapId, { from: accounts[2] });
      claimReward = claimReward.logs[0].args.claimReward;

      const balanceAfterClaim = {
        contract: +(await fusd.balanceOf(cds.address)),
        buyer: +(await fusd.balanceOf(accounts[2])),
        seller: +(await fusd.balanceOf(accounts[1])),
      };

      // claimReward
      assert.equal(+claimReward, claimRewardIntended);
      // contract
      assert.equal(
        balanceBeforeClaim.contract,
        balanceAfterClaim.contract +
          (defaultBuyerDeposit - defaultPremium) +
          defaultSellerDeposit,
      );
      // buyer
      assert.equal(
        balanceBeforeClaim.buyer,
        balanceAfterClaim.buyer -
          claimRewardIntended -
          (defaultBuyerDeposit - defaultPremium),
      );
      // seller
      assert.equal(
        balanceBeforeClaim.seller,
        balanceAfterClaim.seller + claimRewardIntended - defaultSellerDeposit,
      );

      // status
      const status = await cds.getStatus(currentSwapId);
      assert.strictEqual(3, +status);
    });

    // claim when currPrice is below LP => 50
    it('should return proper status and reward seller deposit to buyer if the current price of the asset is below liquidation price ', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
      });

      const changedPrice = 19000;
      await priceOracle.setPrice(changedPrice);

      const balanceBeforeClaim = {
        contract: +(await fusd.balanceOf(cds.address)),
        buyer: +(await fusd.balanceOf(accounts[2])),
        seller: +(await fusd.balanceOf(accounts[1])),
      };

      let claimReward = await cds.claim(currentSwapId, { from: accounts[2] });
      claimReward = claimReward.logs[0].args.claimReward;

      const balanceAfterClaim = {
        contract: +(await fusd.balanceOf(cds.address)),
        buyer: +(await fusd.balanceOf(accounts[2])),
        seller: +(await fusd.balanceOf(accounts[1])),
      };

      // claimReward
      assert.equal(+claimReward, defaultSellerDeposit);
      // contract
      assert.equal(
        balanceBeforeClaim.contract,
        balanceAfterClaim.contract +
          (defaultBuyerDeposit - defaultPremium) +
          defaultSellerDeposit,
      );
      // buyer
      assert.equal(
        balanceBeforeClaim.buyer,
        balanceAfterClaim.buyer -
          defaultSellerDeposit -
          (defaultBuyerDeposit - defaultPremium),
      );
      // seller
      assert.equal(balanceBeforeClaim.seller, balanceAfterClaim.seller);

      // status
      const status = await cds.getStatus(currentSwapId);
      assert.strictEqual(3, +status);
    });
  });

  describe('Pay Premium', async () => {
    beforeEach(async () => {
      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[2],
      });
      await cds.create(
        defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        defaultPremiumRounds,
        { from: accounts[2] },
      );
    });

    it('should throw error if the status of the swap is not active', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await fusd.approve(cds.address, defaultPremium, { from: accounts[2] });
      await truffleAssert.fails(
        cds.payPremium(currentSwapId, { from: accounts[2] }),
      );
    });

    it('should throw error if the method is not called by the buyer', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
      });
      await fusd.approve(cds.address, defaultPremium, { from: accounts[2] });
      await truffleAssert.fails(
        cds.payPremium(currentSwapId, { from: accounts[1] }),
      );
    });

    it('should throw error if the buyer approved invalid amount of premium', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
      });
      await fusd.approve(cds.address, defaultPremium + 1, {
        from: accounts[2],
      });
      await truffleAssert.fails(
        cds.payPremium(currentSwapId, { from: accounts[2] }),
      );
    });

    it('should pass if proper premium paid, and check the balance of the participants', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
      });

      const balanceBeforePremium = {
        buyer: +(await fusd.balanceOf(accounts[2])),
        seller: +(await fusd.balanceOf(accounts[1])),
      };

      await fusd.approve(cds.address, defaultPremium, {
        from: accounts[2],
      });
      await truffleAssert.passes(
        cds.payPremium(currentSwapId, { from: accounts[2] }),
      );

      const balanceAfterPremium = {
        buyer: +(await fusd.balanceOf(accounts[2])),
        seller: +(await fusd.balanceOf(accounts[1])),
      };

      // buyer
      assert.equal(
        balanceBeforePremium.buyer,
        balanceAfterPremium.buyer + defaultPremium,
      );
      // seller
      assert.equal(
        balanceBeforePremium.seller,
        balanceAfterPremium.seller - defaultPremium,
      );
    });

    it('should pass if totalPremiumRounds changed properly', async () => {
      const [currentSwapId] = await cds.getSwapId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
      });

      const roundBeforePremium = await cds.getRounds(currentSwapId);

      await fusd.approve(cds.address, defaultPremium, {
        from: accounts[2],
      });
      await truffleAssert.passes(
        cds.payPremium(currentSwapId, { from: accounts[2] }),
      );

      const roundAfterPremium = await cds.getRounds(currentSwapId);
      assert.equal(roundBeforePremium - 1, roundAfterPremium);
    });

    it('should fail if round left is already 0', async () => {
      const premiumRounds = 1;
      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[2],
      });
      await cds.create(
        defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        premiumRounds,
        { from: accounts[2] },
      );

      const [currentSwapId] = await cds.getSwapId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
      });
      // round becomes 0 after accpet from seller

      await fusd.approve(cds.address, defaultPremium, {
        from: accounts[2],
      });
      await truffleAssert.fails(
        cds.payPremium(currentSwapId, { from: accounts[2] }),
      );
    });
  });

  describe('Expire by rounds', async () => {
    beforeEach(async () => {
      const premiumRounds = 2;
      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[2],
      });
      await cds.create(
        defaultHostSetting,
        defaultInitAssetPrice,
        defaultClaimPrice,
        defaultLiquidationPrice,
        defaultSellerDeposit,
        defaultPremium,
        premiumRounds,
        { from: accounts[2] },
      );
      const [currentSwapId] = await cds.getSwapId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentSwapId, {
        from: accounts[1],
      });
    });

    it('should pass if the caller is seller and round left is 0', async () => {
      // current round = 1
      const [currentSwapId] = await cds.getSwapId();
      await fusd.approve(cds.address, defaultPremium, {
        from: accounts[2],
      });
      await cds.payPremium(currentSwapId, { from: accounts[2] });

      // current round = 0
      await truffleAssert.passes(
        cds.expire(currentSwapId, { from: accounts[1] }),
      );
    });

    it('should fail if round left is not 0', async () => {
      // current round = 1
      const [currentSwapId] = await cds.getSwapId();
      await truffleAssert.fails(
        cds.expire(currentSwapId, { from: accounts[1] }),
      );
    });

    it('should fail if the caller is not the seller', async () => {
      // current round = 1
      const [currentSwapId] = await cds.getSwapId();
      await fusd.approve(cds.address, defaultPremium, {
        from: accounts[2],
      });
      await cds.payPremium(currentSwapId, { from: accounts[2] });

      // current round = 0
      await truffleAssert.fails(
        cds.expire(currentSwapId, { from: accounts[3] }),
      );
    });

    it('should return proper amount of token after expired', async () => {
      // current round = 1
      const [currentSwapId] = await cds.getSwapId();
      await fusd.approve(cds.address, defaultPremium, {
        from: accounts[2],
      });
      await cds.payPremium(currentSwapId, { from: accounts[2] });

      const beforeExpired = {
        contract: +(await fusd.balanceOf(cds.address)),
        buyer: +(await fusd.balanceOf(accounts[2])),
        seller: +(await fusd.balanceOf(accounts[1])),
      };
      // current round = 0
      await cds.expire(currentSwapId, { from: accounts[1] });
      const afterExpired = {
        contract: +(await fusd.balanceOf(cds.address)),
        buyer: +(await fusd.balanceOf(accounts[2])),
        seller: +(await fusd.balanceOf(accounts[1])),
      };

      // contract
      assert.equal(
        beforeExpired.contract,
        afterExpired.contract +
          (defaultBuyerDeposit - defaultPremium) +
          defaultSellerDeposit,
      );
      // buyer
      assert.equal(
        beforeExpired.buyer,
        afterExpired.buyer - (defaultBuyerDeposit - defaultPremium),
      );
      // seller
      assert.equal(
        beforeExpired.seller,
        afterExpired.seller - defaultSellerDeposit,
      );
    });

    it('should have status of expire after expired successfully', async () => {
      // current round = 1
      const [currentSwapId] = await cds.getSwapId();
      await fusd.approve(cds.address, defaultPremium, {
        from: accounts[2],
      });
      await cds.payPremium(currentSwapId, { from: accounts[2] });

      // current round = 0
      await cds.expire(currentSwapId, { from: accounts[1] });

      const status = await cds.getStatus(currentSwapId);
      assert.equal(4, +status);
    });
  });
});
