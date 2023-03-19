/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const truffleAssert = require('truffle-assertions');

const PriceOracleMock = artifacts.require('PriceOracleMock');
const FUSD = artifacts.require('FUSD');
const CDS = artifacts.require('CDSLounge');
const Contract = artifacts.require('CDS');

require('dotenv').config();

contract('CDS', async (accounts) => {
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
  const defaultAssetType = 0; // BTC:0, ETH:1, LINK:2

  const { PRICE_ORACLE_ADDRESS, FUSD_ADDRESS } = process.env;

  before(async () => {
    priceOracle = await PriceOracleMock.at(PRICE_ORACLE_ADDRESS);
    fusd = await FUSD.at(FUSD_ADDRESS);
    cds = await CDS.new({ from: accounts[0] });
  });

  describe('Price Oracle', () => {
    it('should throw error if priceOracle is not set', async () => {
      await assert.strictEqual(PRICE_ORACLE_ADDRESS, priceOracle.address);
    });

    it('should be able to get value from it', async () => {
      const btcPrice = 2500000000000;
      const ethPrice = 160000000000;
      const linkPrice = 750000000;

      await assert.strictEqual(btcPrice, +(await priceOracle.btcPrice()));
      await assert.strictEqual(ethPrice, +(await priceOracle.ethPrice()));
      await assert.strictEqual(linkPrice, +(await priceOracle.linkPrice()));
    });

    it('should be able to set value and check if changed properly', async () => {
      const defaultBTCPrice = 2500000000000;
      const defaultETHPrice = 160000000000;
      const defaultLinkPrice = 750000000;

      const changeBTCPrice = 2200000000000;
      const changeETHPrice = 200000000000;
      const changeLinkPrice = 600000000;

      await truffleAssert.passes(
        await priceOracle.setBTCPrice(changeBTCPrice, { from: accounts[0] }),
        await priceOracle.setETHPrice(changeETHPrice, { from: accounts[0] }),
        await priceOracle.setLinkPrice(changeLinkPrice, { from: accounts[0] }),
      );

      await assert.strictEqual(changeBTCPrice, +(await priceOracle.btcPrice()));
      await assert.strictEqual(changeETHPrice, +(await priceOracle.ethPrice()));
      await assert.strictEqual(
        changeLinkPrice,
        +(await priceOracle.linkPrice()),
      );

      await truffleAssert.passes(
        await priceOracle.setBTCPrice(defaultBTCPrice),
        await priceOracle.setETHPrice(defaultETHPrice),
        await priceOracle.setLinkPrice(defaultLinkPrice),
      );
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
        cds.create(true, 20000, 21250, 20000, 50000, -750, 60 * 10, 12, 0, {
          from: accounts[2],
        }),
      );
      await truffleAssert.fails(
        cds.create(true, 20000, 21250, 20000, 100000, 750, 60 * 10, -12, 0, {
          from: accounts[2],
        }),
      );
    });

    it('should throw error when invalid deposit approved', async () => {
      await fusd.approve(cds.address, defaultBuyerDeposit - 1, {
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
          defaultAssetType,
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
          defaultAssetType,
          { from: accounts[1] },
        ),
      );
    });

    it('should be able to create CDS as BUYER when valid input approved and check it from mapping', async () => {
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
          defaultAssetType,
          { from: accounts[2] },
        ),
      );
      const [currentCDSId] = await cds.getCDSId();
      const buyer = await cds.getBuyer(currentCDSId);
      const seller = await cds.getSeller(currentCDSId);
      const buyerDepositDetail = await cds.deposits(currentCDSId, 0);
      const sellerDepositDetail = await cds.deposits(currentCDSId, 1);

      const cdsAddr = await cds.getCDS(currentCDSId);
      const targetCDS = await Contract.at(cdsAddr);

      const totalRounds = await targetCDS.rounds();
      const CDSPrices = await targetCDS.getPrices();

      const [
        initAssetPrice,
        claimPrice,
        liquidationPrice,
        premium,
        sellerDeposit,
      ] = CDSPrices;

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

    it('should be able to create CDS as SELLER when valid input provided and check it from mapping', async () => {
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
          defaultAssetType,
          { from: accounts[1] },
        ),
      );
      const [currentCDSId] = await cds.getCDSId();
      const buyer = await cds.getBuyer(currentCDSId);
      const seller = await cds.getSeller(currentCDSId);
      const buyerDepositDetail = await cds.deposits(currentCDSId, 0);
      const sellerDepositDetail = await cds.deposits(currentCDSId, 1);

      const cdsAddr = await cds.getCDS(currentCDSId);
      const targetCDS = await Contract.at(cdsAddr);

      const totalRounds = await targetCDS.rounds();
      const CDSPrices = await targetCDS.getPrices();
      const [
        initAssetPrice,
        claimPrice,
        liquidationPrice,
        premium,
        sellerDeposit,
      ] = CDSPrices;

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

    it('should have decreased TOKEN amount of buyer after creating CDS as BUYER', async () => {
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
        defaultAssetType,
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

    it('should have decreased TOKEN amount of seller after creating CDS as SELLER', async () => {
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
        defaultAssetType,
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
    it('should be able to accept CDS as SELLER when valid deposit provided and check it from mapping', async () => {
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
        defaultAssetType,
        { from: accounts[2] },
      );

      const [currentCDSId] = await cds.getCDSId();

      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await truffleAssert.passes(
        cds.accept(defaultInitAssetPrice, currentCDSId, { from: accounts[1] }),
        'accepting',
      );

      const buyer = await cds.getBuyer(currentCDSId);
      const seller = await cds.getSeller(currentCDSId);
      const buyerDepositDetail = await cds.deposits(currentCDSId, 0);
      const sellerDepositDetail = await cds.deposits(currentCDSId, 1);

      const cdsAddr = await cds.getCDS(currentCDSId);
      const targetCDS = await Contract.at(cdsAddr);

      const currRounds = await targetCDS.rounds();
      const [
        initAssetPrice,
        claimPrice,
        liquidationPrice,
        premium,
        sellerDeposit,
      ] = await targetCDS.getPrices();

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

    it('should be able to accept CDS as BUYER when valid deposit provided and check it from mapping', async () => {
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
        defaultAssetType,
        { from: accounts[1] },
      );

      const [currentCDSId] = await cds.getCDSId();

      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[2],
      });
      await truffleAssert.passes(
        cds.accept(defaultInitAssetPrice, currentCDSId, { from: accounts[2] }),
        'accepting',
      );

      const buyer = await cds.getBuyer(currentCDSId);
      const seller = await cds.getSeller(currentCDSId);
      const buyerDepositDetail = await cds.deposits(currentCDSId, 0);
      const sellerDepositDetail = await cds.deposits(currentCDSId, 1);

      const cdsAddr = await cds.getCDS(currentCDSId);
      const targetCDS = await Contract.at(cdsAddr);

      const currRounds = await targetCDS.rounds();
      const [
        initAssetPrice,
        claimPrice,
        liquidationPrice,
        premium,
        sellerDeposit,
      ] = await targetCDS.getPrices();

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
        defaultAssetType,
        { from: accounts[2] },
      );

      const [currentCDSId] = await cds.getCDSId();

      await fusd.approve(cds.address, defaultSellerDeposit - 1, {
        from: accounts[1],
      });
      await truffleAssert.fails(
        cds.accept(defaultInitAssetPrice, currentCDSId, { from: accounts[1] }),
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
        defaultAssetType,
        { from: accounts[1] },
      );

      const [currentCDSId] = await cds.getCDSId();

      await fusd.approve(cds.address, defaultBuyerDeposit - 1, {
        from: accounts[2],
      });

      await truffleAssert.fails(
        cds.accept(defaultInitAssetPrice, currentCDSId, { from: accounts[2] }),
      );
    });

    it('should throw error if the host accepts the CDS', async () => {
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
        defaultAssetType,
        { from: accounts[2] },
      );

      let [currentCDSId] = await cds.getCDSId();

      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[2],
      });

      await truffleAssert.fails(
        cds.accept(defaultInitAssetPrice, currentCDSId, { from: accounts[2] }),
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
        defaultAssetType,
        { from: accounts[1] },
      );

      [currentCDSId] = await cds.getCDSId();

      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[1],
      });
      await truffleAssert.fails(
        cds.accept(defaultInitAssetPrice, currentCDSId, { from: accounts[1] }),
      );
    });

    it('should have right TOKEN amount of seller after accepting CDS as SELLER', async () => {
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
        defaultAssetType,
        { from: accounts[2] },
      );

      const [currentCDSId] = await cds.getCDSId();

      const before = await fusd.balanceOf(accounts[1]);
      const beforeCA = await fusd.balanceOf(cds.address);
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
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

    it('should have right TOKEN amount of buyer after accepting CDS as BUYER', async () => {
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
        defaultAssetType,
        { from: accounts[1] },
      );

      const [currentCDSId] = await cds.getCDSId();

      const before = await fusd.balanceOf(accounts[2]);
      const beforeCA = await fusd.balanceOf(cds.address);
      await fusd.approve(cds.address, defaultBuyerDeposit, {
        from: accounts[2],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
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
        defaultAssetType,
        { from: accounts[2] },
      );
    });

    it('should throw error if the caller of cancel is not the buyer/seller', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await truffleAssert.fails(
        cds.cancel(currentCDSId, { from: accounts[3] }),
      );
    });

    it('should be able to cancel if the buyer calls cancel and check the CDS', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await truffleAssert.passes(
        cds.cancel(currentCDSId, { from: accounts[2] }),
      );
      const buyerDepositDetail = await cds.deposits(currentCDSId, 0);

      const targetCDS = await Contract.at(await cds.getCDS(currentCDSId));
      const cdsStatus = await targetCDS.status();

      await assert.strictEqual(+buyerDepositDetail, 0);
      await assert.strictEqual(0, +cdsStatus); // inactive => 0
    });

    it('should have decreased amount of TOKEN after buyer calling cancel', async () => {
      const before = await fusd.balanceOf(accounts[2]);
      const beforeCA = await fusd.balanceOf(cds.address);

      const [currentCDSId] = await cds.getCDSId();
      await cds.cancel(currentCDSId, { from: accounts[2] });

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
        defaultAssetType,
        { from: accounts[1] },
      );
    });

    it('should throw error if the caller of cancel is not the buyer/seller', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await truffleAssert.fails(
        cds.cancel(currentCDSId, { from: accounts[3] }),
      );
    });

    it('should be able to cancel if the seller calls cancel and check the CDS', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await truffleAssert.passes(
        cds.cancel(currentCDSId, { from: accounts[1] }),
      );
      const sellerDepositDetail = await cds.deposits(currentCDSId, 1);

      const targetCDS = await Contract.at(await cds.getCDS(currentCDSId));
      const cdsStatus = await targetCDS.status();

      await assert.strictEqual(+sellerDepositDetail, 0);
      await assert.strictEqual(0, +cdsStatus); // inactive => 0
    });

    it('should have proper amount of TOKEN after seller calling cancel', async () => {
      const before = await fusd.balanceOf(accounts[1]);
      const beforeCA = await fusd.balanceOf(cds.address);

      const [currentCDSId] = await cds.getCDSId();
      await cds.cancel(currentCDSId, { from: accounts[1] });

      const after = await fusd.balanceOf(accounts[1]);
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
        defaultAssetType,
        { from: accounts[2] },
      );
    });

    it('should throw error if the status is not active', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await truffleAssert.fails(cds.close(currentCDSId, { from: accounts[2] }));
    });

    it('should throw error if the caller is not the buyer', async () => {
      const [currentCDSId] = await cds.getCDSId();

      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });

      await truffleAssert.fails(cds.close(currentCDSId, { from: accounts[1] }));
    });

    it('should be able to close if the buyer calls close and check the state of the CDS', async () => {
      const [currentCDSId] = await cds.getCDSId();

      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });

      await truffleAssert.passes(
        cds.close(currentCDSId, { from: accounts[2] }),
      );

      const buyerDepositDetail = await cds.deposits(currentCDSId, 0);
      const sellerDepositDetail = await cds.deposits(currentCDSId, 1);

      const targetCDS = await Contract.at(await cds.getCDS(currentCDSId));
      const cdsStatus = await targetCDS.status();

      await assert.strictEqual(+buyerDepositDetail, 0);
      await assert.strictEqual(+sellerDepositDetail, 0);
      await assert.strictEqual(4, +cdsStatus); // expired => 4
    });

    it('should have proper amount of balance after close is called', async () => {
      const [currentCDSId] = await cds.getCDSId();

      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });

      const balanceBeforeClose = {
        buyer: +(await fusd.balanceOf(accounts[2])),
        seller: +(await fusd.balanceOf(accounts[1])),
        contract: +(await fusd.balanceOf(cds.address)),
      };

      await truffleAssert.passes(
        cds.close(currentCDSId, { from: accounts[2] }),
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
        defaultAssetType,
        { from: accounts[2] },
      );
    });

    it('should throw error if the status of the CDS is not active', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await truffleAssert.fails(cds.claim(currentCDSId, { from: accounts[2] }));
    });

    it('should throw error if the method is not called by the buyer', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });

      const currPrice = 2100000000000;
      await priceOracle.setBTCPrice(currPrice, { from: accounts[0] });
      await truffleAssert.fails(cds.claim(currentCDSId, { from: accounts[1] }));
    });

    // check proper return
    // claim when currPrice is above CP => 100
    it('should throw error if the current price of the asset is above the claim price', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });

      const currPrice = 2200000000000;
      await priceOracle.setBTCPrice(currPrice, { from: accounts[0] });

      await truffleAssert.fails(cds.claim(currentCDSId, { from: accounts[2] }));
    });

    // claim when currPrice is btwn CP~LP => 21000, claimReward should be 40000
    it('should return proper status and reward if the current price of the asset is below claim price ', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });

      const changedPrice = 2100000000000;
      const claimRewardIntended = 40000;
      await priceOracle.setBTCPrice(changedPrice);

      const balanceBeforeClaim = {
        contract: +(await fusd.balanceOf(cds.address)),
        buyer: +(await fusd.balanceOf(accounts[2])),
        seller: +(await fusd.balanceOf(accounts[1])),
      };

      let claimReward = await cds.claim(currentCDSId, { from: accounts[2] });
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
      const targetCDS = await Contract.at(await cds.getCDS(currentCDSId));
      const cdsStatus = await targetCDS.status();
      assert.strictEqual(3, +cdsStatus);
    });

    // claim when currPrice is below LP => 50
    it('should return proper status and reward seller deposit to buyer if the current price of the asset is below liquidation price ', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });

      const changedPrice = 1900000000000;
      await priceOracle.setBTCPrice(changedPrice);

      const balanceBeforeClaim = {
        contract: +(await fusd.balanceOf(cds.address)),
        buyer: +(await fusd.balanceOf(accounts[2])),
        seller: +(await fusd.balanceOf(accounts[1])),
      };

      let claimReward = await cds.claim(currentCDSId, { from: accounts[2] });
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
      const targetCDS = await Contract.at(await cds.getCDS(currentCDSId));
      const cdsStatus = await targetCDS.status();
      assert.strictEqual(3, +cdsStatus);
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
        defaultAssetType,
        { from: accounts[2] },
      );
    });

    it('should throw error if the status of the CDS is not active', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultPremium, { from: accounts[2] });
      await truffleAssert.fails(
        cds.payPremium(currentCDSId, { from: accounts[2] }),
      );
    });

    it('should throw error if the method is not called by the buyer', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });
      await fusd.approve(cds.address, defaultPremium, { from: accounts[2] });
      await truffleAssert.fails(
        cds.payPremium(currentCDSId, { from: accounts[1] }),
      );
    });

    it('should throw error if the buyer approved invalid amount of premium', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });
      await fusd.approve(cds.address, defaultPremium - 1, {
        from: accounts[2],
      });
      await truffleAssert.fails(
        cds.payPremium(currentCDSId, { from: accounts[2] }),
      );
    });

    it('should pass if proper premium paid, and check the balance of the participants', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
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
        cds.payPremium(currentCDSId, { from: accounts[2] }),
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
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });

      const targetCDS = await Contract.at(await cds.getCDS(currentCDSId));
      const roundBeforePremium = await targetCDS.rounds();

      await fusd.approve(cds.address, defaultPremium, {
        from: accounts[2],
      });
      await truffleAssert.passes(
        cds.payPremium(currentCDSId, { from: accounts[2] }),
      );

      const roundAfterPremium = await targetCDS.rounds();
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
        defaultAssetType,
        { from: accounts[2] },
      );

      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });
      // round becomes 0 after accpet from seller

      await fusd.approve(cds.address, defaultPremium, {
        from: accounts[2],
      });
      await truffleAssert.fails(
        cds.payPremium(currentCDSId, { from: accounts[2] }),
      );
    });
  });

  describe('Pay Premium by Deposit', async () => {
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
        defaultAssetType,
        { from: accounts[2] },
      );
    });

    it('should pass if proper premium paid from DEPOSIT, and check the balance of the seller and contract', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });

      const balanceBeforePremium = {
        contract: +(await fusd.balanceOf(cds.address)),
        seller: +(await fusd.balanceOf(accounts[1])),
      };

      await truffleAssert.passes(
        cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }),
      );

      const balanceAfterPremium = {
        contract: +(await fusd.balanceOf(cds.address)),
        seller: +(await fusd.balanceOf(accounts[1])),
      };

      // contract
      assert.equal(
        balanceBeforePremium.contract,
        balanceAfterPremium.contract + defaultPremium,
      );
      // seller
      assert.equal(
        balanceBeforePremium.seller,
        balanceAfterPremium.seller - defaultPremium,
      );
    });

    it('should pass if rounds and deposit changed properly', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });

      const targetCDS = await Contract.at(await cds.getCDS(currentCDSId));
      const roundBeforePremium = await targetCDS.rounds();

      const depositBeforePremium = await cds.deposits(currentCDSId, 0);
      const payDateBeforePremium = await cds.nextPayDate(currentCDSId);

      await truffleAssert.passes(
        cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }),
      );

      const roundAfterPremium = await targetCDS.rounds();
      const depositAfterPremium = await cds.deposits(currentCDSId, 0);
      const payDateAfterPremium = await cds.nextPayDate(currentCDSId);

      assert.equal(roundBeforePremium - 1, roundAfterPremium);
      assert.equal(
        +depositBeforePremium - defaultPremium,
        +depositAfterPremium,
      );
      assert.equal(+payDateBeforePremium + 604800 * 4, +payDateAfterPremium);
    });

    it('should throw error if the status of the CDS is not active', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await truffleAssert.fails(
        cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }),
      );
    });

    it('should throw error if the method is not called by the owner', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });
      await truffleAssert.fails(
        cds.payPremiumByDeposit(currentCDSId, { from: accounts[1] }),
      );
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
        defaultAssetType,
        { from: accounts[2] },
      );

      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });

      // round becomes 0 after accpet from seller
      const targetCDS = await Contract.at(await cds.getCDS(currentCDSId));
      const round = await targetCDS.rounds();

      assert.equal(+round, 0);
      await truffleAssert.fails(
        cds.payPremiumByDeposit(currentCDSId, { from: accounts[1] }),
      );
    });

    it('should throw error if the deposit left is already 0', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });

      // first payPremiumByDeposit
      let depositBeforePremium = await cds.deposits(currentCDSId, 0);
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] });
      let depositAfterPremium = await cds.deposits(currentCDSId, 0);
      assert.equal(+depositBeforePremium - defaultPremium, depositAfterPremium);

      // second payPremiumByDeposit
      depositBeforePremium = await cds.deposits(currentCDSId, 0);
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] });
      depositAfterPremium = await cds.deposits(currentCDSId, 0);
      assert.equal(+depositBeforePremium - defaultPremium, depositAfterPremium);

      // third payPremiumByDeposit
      depositBeforePremium = await cds.deposits(currentCDSId, 0);
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] });
      depositAfterPremium = await cds.deposits(currentCDSId, 0);
      assert.equal(+depositBeforePremium - defaultPremium, depositAfterPremium);

      // no deposit remaining
      assert.equal(+depositAfterPremium, 0);
      await truffleAssert.fails(
        cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }),
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
        defaultAssetType,
        { from: accounts[2] },
      );
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });
    });

    it('should pass if the caller is seller and round left is 0', async () => {
      // current round = 1
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultPremium, {
        from: accounts[2],
      });
      await cds.payPremium(currentCDSId, { from: accounts[2] });

      // current round = 0
      await truffleAssert.passes(
        cds.expire(currentCDSId, { from: accounts[1] }),
      );
    });

    it('should fail if round left is not 0', async () => {
      // current round = 1
      const [currentCDSId] = await cds.getCDSId();
      await truffleAssert.fails(
        cds.expire(currentCDSId, { from: accounts[1] }),
      );
    });

    it('should fail if the caller is not the seller', async () => {
      // current round = 1
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultPremium, {
        from: accounts[2],
      });
      await cds.payPremium(currentCDSId, { from: accounts[2] });

      // current round = 0
      await truffleAssert.fails(
        cds.expire(currentCDSId, { from: accounts[3] }),
      );
    });

    it('should return proper amount of token after expired', async () => {
      // current round = 1
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultPremium, {
        from: accounts[2],
      });
      await cds.payPremium(currentCDSId, { from: accounts[2] });

      const beforeExpired = {
        contract: +(await fusd.balanceOf(cds.address)),
        buyer: +(await fusd.balanceOf(accounts[2])),
        seller: +(await fusd.balanceOf(accounts[1])),
      };
      // current round = 0
      await cds.expire(currentCDSId, { from: accounts[1] });
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
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultPremium, {
        from: accounts[2],
      });
      await cds.payPremium(currentCDSId, { from: accounts[2] });

      // current round = 0
      await cds.expire(currentCDSId, { from: accounts[1] });

      const targetCDS = await Contract.at(await cds.getCDS(currentCDSId));
      const cdsStatus = await targetCDS.status();
      assert.equal(4, +cdsStatus);
    });
  });

  describe('Expire by deposits', async () => {
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
        defaultAssetType,
        { from: accounts[2] },
      );
      const [currentCDSId] = await cds.getCDSId();
      await fusd.approve(cds.address, defaultSellerDeposit, {
        from: accounts[1],
      });
      await cds.accept(defaultInitAssetPrice, currentCDSId, {
        from: accounts[1],
      });
    });

    it('should pass if the caller is seller and deposit left is 0', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 2 * premium
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 1 * premium
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 0 * premium

      await truffleAssert.passes(
        cds.expire(currentCDSId, { from: accounts[1] }),
      );
    });

    it('should fail if deposit left is not 0', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 2 * premium
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 1 * premium
      const deposit = await cds.deposits(currentCDSId, 0);
      assert.equal(+deposit, defaultPremium);

      await truffleAssert.fails(
        cds.expire(currentCDSId, { from: accounts[1] }),
      );
    });

    it('should fail if the caller is not the seller', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 2 * premium
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 1 * premium
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 0 * premium

      await truffleAssert.fails(
        cds.expire(currentCDSId, { from: accounts[0] }),
      );
    });

    it('should return proper amount of token after expired', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 2 * premium
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 1 * premium
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 0 * premium

      const beforeExpired = {
        contract: +(await fusd.balanceOf(cds.address)),
        buyer: +(await fusd.balanceOf(accounts[2])),
        seller: +(await fusd.balanceOf(accounts[1])),
      };
      await cds.expire(currentCDSId, { from: accounts[1] });
      const afterExpired = {
        contract: +(await fusd.balanceOf(cds.address)),
        buyer: +(await fusd.balanceOf(accounts[2])),
        seller: +(await fusd.balanceOf(accounts[1])),
      };

      // contract
      assert.equal(
        beforeExpired.contract - defaultSellerDeposit,
        afterExpired.contract,
      );
      // buyer
      assert.equal(beforeExpired.buyer, afterExpired.buyer);
      // seller
      assert.equal(
        beforeExpired.seller + defaultSellerDeposit,
        afterExpired.seller,
      );
    });

    it('should have status of expire after expired successfully', async () => {
      const [currentCDSId] = await cds.getCDSId();
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 2 * premium
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 1 * premium
      await cds.payPremiumByDeposit(currentCDSId, { from: accounts[0] }); // current deposit = 0 * premium

      await truffleAssert.passes(
        cds.expire(currentCDSId, { from: accounts[1] }),
      );

      const targetCDS = await Contract.at(await cds.getCDS(currentCDSId));
      const cdsStatus = await targetCDS.status();
      assert.equal(4, +cdsStatus);
    });
  });
});
