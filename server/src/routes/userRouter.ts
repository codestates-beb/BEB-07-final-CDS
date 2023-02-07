import express from 'express';

import { isLoggedIn } from '../middlewares/loginChecker';
import userController from '../controllers/userController';
const userRouter = express.Router();

userRouter.post('/my', isLoggedIn, userController.postMine);
userRouter.get('/my', isLoggedIn, userController.getMine);
userRouter.get('/:address', userController.getByAddress);
userRouter.get('/', userController.getAll);

export default userRouter;
