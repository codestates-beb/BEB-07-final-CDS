import express from 'express';
import { isLoggedIn } from '../middlewares/loginChecker';
import redisClient from '../utils/redisClient';
import { Users } from '../entities/Users';
import { AppDataSource } from '../data-source';
import { sendEther, sendToken } from '../utils/faucets';

const userRepository = AppDataSource.getRepository(Users);
const faucetRouter = express.Router();

faucetRouter.get('/ether', isLoggedIn, async (req, res, next) => {
  try {
    const address = await redisClient.get(req.cookies.sessionID);
    const user = await userRepository.findOneBy({ address });
    if (!user) return res.status(404).json('no such user');
    sendEther(address);
    return res.status(200).json({ message: 'Ether faucet activated' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
faucetRouter.get('/token', isLoggedIn, async (req, res, next) => {
  try {
    const address = await redisClient.get(req.cookies.sessionID);
    const user = await userRepository.findOneBy({ address });
    if (!user) return res.status(404).json('no such user');
    sendToken(address);
    return res.status(200).json({ message: 'Token faucet activated' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default faucetRouter;
