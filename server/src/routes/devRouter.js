const express = require('express');

const User = require('../models/user');
const Swap = require('../models/swap');
const Transaction = require('../models/transaction');

const router = express.Router();
router.get('/swaps', async (req, res, next) => {
  try {
    const swaps = await Swap.findAll({});
    return res.status(200).json(swaps);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/swaps/:swapId', async (req, res, next) => {
  try {
    const swapId = req.params;
    const data = await Swap.findOne({ where: { swapId } });
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
// router.get('/swaps/:swapId', nftController.getAllNfts);
// router.get('/users');
// router.get('/users/:address', nftController.getAllNfts);
// router.get('/transactions');
// router.get('/transactions/:txhash');
// router.get('/oracle/:assetType');

module.exports = router;
