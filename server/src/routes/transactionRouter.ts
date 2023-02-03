import express from 'express';

import { AppDataSource } from '../data-source';
import { Transactions } from '../entities/Transactions';

const transactionRepository = AppDataSource.getRepository(Transactions);
const transactionRouter = express.Router();

transactionRouter.get('/:txHash', async (req, res, next) => {
  try {
    const txHash = req.params.txHash;
    const singleTransaction = await transactionRepository.findOneBy({ txHash });
    return res.status(200).json(singleTransaction);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

transactionRouter.get('/', async (req, res, next) => {
  try {
    const allTransactions = await transactionRepository.find({});
    return res.status(200).json(allTransactions);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default transactionRouter;
