const express = require('express');

const User = require('../models/user');
const Swap = require('../models/swap');
const Transaction = require('../models/transaction');

const router = express.Router();
router.get('/swaps', async (req, res, next) => {
  try {
    const allSwaps = await Swap.findAll({});
    return res.status(200).json(allSwaps);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/swaps/:swapId', async (req, res, next) => {
  try {
    const swapId = req.params.swapId;
    console.log(swapId);
    const singleSwap = await Swap.findOne({ where: { swapId } });
    return res.status(200).json(singleSwap);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/users', async (req, res, next) => {
  try {
    const allUsers = await User.findAll({});
    return res.status(200).json(allUsers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/users/:address', async (req, res, next) => {
  try {
    const address = req.params.address;
    const singleUser = await User.findOne({ where: { address } });
    return res.status(200).json(singleUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/transactions', async (req, res, next) => {
  try {
    const allTransactions = await Transaction.findAll({});
    return res.status(200).json(allTransactions);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get('/transactions/:txHash', async (req, res, next) => {
  try {
    const txHash = req.params.txHash;
    const singleTransaction = await Transaction.findOne({ where: { txHash } });
    return res.status(200).json(singleTransaction);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
// router.get('/transactions/:swapId', nftController.getAllNfts);
// router.get('/users');
// router.get('/users/:address', nftController.getAllNfts);
// router.get('/transactions');
// router.get('/transactions/:txhash');
// router.get('/oracle/:assetType');

module.exports = router;
