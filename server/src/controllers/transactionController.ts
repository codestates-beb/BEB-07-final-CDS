import { Request, Response, NextFunction } from 'express';

import { AppDataSource } from '../data-source';
import { Transactions } from '../entities/Transactions';

const transactionRepository = AppDataSource.getRepository(Transactions);

const transactionController = {
  getByTxHash: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const txHash = req.params.txHash;
      const singleTransaction = await transactionRepository.findOneBy({
        txHash,
      });
      return res.status(200).json(singleTransaction);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allUsers = await transactionRepository.find({});
      return res.status(200).json(allUsers);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};

export default transactionController;
