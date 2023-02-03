import express from 'express';

import { AppDataSource } from '../data-source';
import { Users } from '../entities/Users';

const userRepository = AppDataSource.getRepository(Users);
const userRouter = express.Router();

userRouter.get('/:address', async (req, res, next) => {
  try {
    const address = req.params.address;
    const singleUser = await userRepository.findOneBy({ address });
    return res.status(200).json(singleUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

userRouter.get('/', async (req, res, next) => {
  try {
    const allUsers = await userRepository.find({});
    return res.status(200).json(allUsers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
export default userRouter;
