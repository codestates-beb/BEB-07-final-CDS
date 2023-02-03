import express from 'express';

import redisClient from '../utils/redisClient';
import { AppDataSource } from '../data-source';
import { Users } from '../entities/Users';
import { Swaps } from '../entities/Swaps';
import { Transactions } from '../entities/Transactions';

const userRepository = AppDataSource.getRepository(Users);
const swapRepository = AppDataSource.getRepository(Swaps);
const transactionRepository = AppDataSource.getRepository(Transactions);

const devRouter = express.Router();

devRouter.get('/swaps', async (req, res, next) => {
  try {
    const allSwaps = await swapRepository.find({});
    return res.status(200).json(allSwaps);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

devRouter.get('/swaps/:swapId', async (req, res, next) => {
  try {
    const swapId = +req.params.swapId;
    const singleSwap = await swapRepository.findOneBy({ swapId });
    return res.status(200).json(singleSwap);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

devRouter.get('/users', async (req, res, next) => {
  try {
    const allUsers = await userRepository.find({});
    return res.status(200).json(allUsers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

devRouter.get('/users/:address', async (req, res, next) => {
  try {
    const address = req.params.address;
    const singleUser = await userRepository.findOneBy({ address });
    return res.status(200).json(singleUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

devRouter.get('/transactions', async (req, res, next) => {
  try {
    const allTransactions = await transactionRepository.find({});
    return res.status(200).json(allTransactions);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

devRouter.get('/transactions/:txHash', async (req, res, next) => {
  try {
    const txHash = req.params.txHash;
    const singleTransaction = await transactionRepository.findOneBy({ txHash });
    return res.status(200).json(singleTransaction);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

devRouter.get('/prices/coingecko', async (req, res, next) => {
  try {
    let cached = await redisClient.get('geckoPrices');
    return res.status(200).json(JSON.parse(cached));
  } catch (err) {
    return res.status(500).json({
      message:
        'Price feed outdated more than 1hr and not automatically updated contact admin',
    });
  }
});

devRouter.get('/prices/chainlink', async (req, res, next) => {
  try {
    let cached = await redisClient.get('linkPrices');
    return res.status(200).json(JSON.parse(cached));
  } catch (err) {
    return res.status(500).json({
      message:
        'Price feed outdated more than 1hr and not automatically updated contact admin',
    });
  }
});

devRouter.get('/users');
devRouter.get('/transactions');
devRouter.get('/transactions/:txhash');
devRouter.get('/oracle/:assetType');

export default devRouter;
