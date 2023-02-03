import express from 'express';

import redisClient from '../utils/redisClient';
import { AppDataSource } from '../data-source';
import { Users } from '../entities/Users';
import { Swaps } from '../entities/Swaps';
import { Transactions } from '../entities/Transactions';

const swapRepository = AppDataSource.getRepository(Swaps);
const swapRouter = express.Router();

swapRouter.get('/:swapId', async (req, res, next) => {
  try {
    const swapId = +req.params.swapId;
    const singleSwap = await swapRepository.findOneBy({ swapId });
    return res.status(200).json(singleSwap);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

swapRouter.get('/', async (req, res, next) => {
  try {
    const allSwaps = await swapRepository.find({});
    return res.status(200).json(allSwaps);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default swapRouter;
