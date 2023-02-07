import express, {
  CookieOptions,
  NextFunction,
  Request,
  Response,
} from 'express';

import redisClient from '../utils/redisClient';
import { isValidEmail } from '../utils/inputValidators';
import { AppDataSource } from '../data-source';
import { Users } from '../entities/Users';
import { Swaps } from '../entities/Swaps';
import { Transactions } from '../entities/Transactions';

const userRepository = AppDataSource.getRepository(Users);
const swapRepository = AppDataSource.getRepository(Swaps);
const transactionRepository = AppDataSource.getRepository(Transactions);

const userController = {
  postMine: async (req: Request, res: Response, next: NextFunction) => {
    const { email, nickname } = req.body;
    if (!isValidEmail(email) && !nickname) {
      return res.status(403).json('Neither email nor nickname provided');
    }
    const address = await redisClient.get(req.cookies.sessionID);
    const user = await userRepository.findOneBy({ address });
    if (!user) return res.status(403).json('no such user');
    if (isValidEmail(email)) user.email = email;
    if (nickname) user.nickname = nickname;
    await userRepository.save(user);
    return res.status(200).json('User Update Successful');
  },
  getMine: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address = await redisClient.get(req.cookies.sessionID);
      const user = await userRepository.findOneBy({ address });
      if (!user) return res.status(404).json('no such user');
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  getMySwaps: async (req: Request, res: Response, next: NextFunction) => {
    const address = await redisClient.get(req.cookies.sessionID);
    const user = await userRepository.findOneBy({ address });
    if (!user) return res.status(403).json('no such user');
    try {
      let mySwaps = await swapRepository.findAndCount({
        where: [{ seller: address }, { buyer: address }],
      });
      const result = {
        address: address,
        totalSwapCount: mySwaps[1],
        swaps: mySwaps[0],
      };
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  getMyTransactions: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const address = await redisClient.get(req.cookies.sessionID);
      const user = await userRepository.findOneBy({ address });
      if (!user) return res.status(403).json('no such user');
      let txQuery = transactionRepository
        .createQueryBuilder('transactions')
        .select('transactions')
        .innerJoin(Swaps, 'swaps', 'swaps.swapId = transactions.swapId')
        .innerJoin(
          Users,
          'users',
          'users.address = swaps.seller OR users.address = swaps.buyer',
        )
        .where(`users.address = "${address}"`);
      const result = await txQuery.getManyAndCount();
      return res.status(200).json({
        address,
        totaltransactionCount: result[1],
        transactions: result[0],
      });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
  getByAddress: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address = req.params.address;
      const user = await userRepository.findOneBy({ address });
      if (!user) return res.status(403).json('no such user');
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  getSwapByAddress: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address = req.params.address;
      const user = await userRepository.findOneBy({ address });
      if (!user) return res.status(403).json('no such user');
      let swaps = await swapRepository.findAndCount({
        where: [{ seller: address }, { buyer: address }],
      });
      const result = {
        address: address,
        totalSwapCount: swaps[1],
        swaps: swaps[0],
      };
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  getTransactionsByAddress: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const address = req.params.address;
      const user = await userRepository.findOneBy({ address });
      if (!user) return res.status(403).json('no such user');
      let txQuery = transactionRepository
        .createQueryBuilder('transactions')
        .select('transactions')
        .innerJoin(Swaps, 'swaps', 'swaps.swapId = transactions.swapId')
        .innerJoin(
          Users,
          'users',
          'users.address = swaps.seller OR users.address = swaps.buyer',
        )
        .where(`users.address = "${address}"`);
      const result = await txQuery.getManyAndCount();
      return res.status(200).json({
        address,
        totaltransactionCount: result[1],
        transactions: result[0],
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allUsers = await userRepository.find({});
      return res.status(200).json(allUsers);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};

export default userController;
