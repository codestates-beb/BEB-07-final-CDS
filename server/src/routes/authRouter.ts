import express from 'express';

import authController from '../controllers/authController';
import { isLoggedIn, isNotLoggedIn } from '../middlewares/loginChecker';

const authRouter = express.Router();

authRouter.post('/login', isNotLoggedIn, authController.login);

authRouter.get('/logout', isLoggedIn, authController.logout);
authRouter.get('/nonce', isNotLoggedIn, authController.getNonce);
authRouter.get('/verify', isLoggedIn, authController.verify);

export default authRouter;
