import { Request, Response, NextFunction } from 'express';

import { AppDataSource } from '../data-source';
import { Swaps } from '../entities/Swaps';

const swapRepository = AppDataSource.getRepository(Swaps);

const swapController = {
  getBySwapId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const swapId = +req.params.swapId;
      const singleSwap = await swapRepository.findOneBy({ swapId });
      return res.status(200).json(singleSwap);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allSwaps = await swapRepository.find({});
      return res.status(200).json(allSwaps);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};

export default swapController;
