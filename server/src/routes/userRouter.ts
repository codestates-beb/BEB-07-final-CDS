import express, { CookieOptions } from 'express';
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';

import { isLoggedIn } from '../middlewares/loginChecker';
import { AppDataSource } from '../data-source';
import { Users } from '../entities/Users';
import redisClient from '../utils/redisClient';
import { isValidAddress, isValidEmail } from '../utils/inputValidators';
import { getNonce } from '../utils/getNonce';
import userController from '../controllers/userController';
const userRepository = AppDataSource.getRepository(Users);
const userRouter = express.Router();

userRouter.post('/my', isLoggedIn, userController.postMine);
userRouter.get('/my', isLoggedIn, userController.getMine);
userRouter.get('/:address', userController.getByAddress);
userRouter.get('/', userController.getAll);

export default userRouter;
