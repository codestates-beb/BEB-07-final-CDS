import express from 'express';

import { isLoggedIn } from '../middlewares/loginChecker';
import userController from '../controllers/userController';
const userRouter = express.Router();

userRouter.post('/my', isLoggedIn, userController.postMine);
userRouter.get('/my', isLoggedIn, userController.getMine);
userRouter.get(
  '/my/transactions',
  isLoggedIn,
  userController.getMyTransactions,
);
userRouter.get('/my/swaps', isLoggedIn, userController.getMySwaps);

userRouter.get('/:address', userController.getByAddress);
userRouter.get('/:address/swaps', userController.getSwapByAddress);
userRouter.get(
  '/:address/transactions',
  userController.getTransactionsByAddress,
);

userRouter.get('/', userController.getAll);

export default userRouter;
