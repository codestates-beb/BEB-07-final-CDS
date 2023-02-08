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

const userRepository = AppDataSource.getRepository(Users);

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
  getByAddress: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address = req.params.address;
      const singleUser = await userRepository.findOneBy({ address });
      return res.status(200).json(singleUser);
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
