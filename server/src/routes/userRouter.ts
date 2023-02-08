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

userRouter.post('/login', async (req, res, next) => {
  try {
    const { address, signature } = req.body;
    console.log(address, signature);
    if (!address || !signature) {
      return res.status(403).json('You Must POST both address and signature');
    }
    const user = await userRepository.findOneBy({ address });
    if (!user || !user.nonce) {
      return res.status(403).json('You Must ask for Nonce before logging in');
    }
    const nonce = user.nonce;
    user.nonce = null;
    await userRepository.save(user);

    const msgBufferHex = bufferToHex(Buffer.from('sign: ' + nonce.toString()));
    const parsedAddress = recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });
    console.log({ parsedAddress });
    if (parsedAddress.toLowerCase() !== address.toLowerCase()) {
      return res
        .status(403)
        .json('Login Failed : Signature from invalid address');
    }
    const cookieOptions: CookieOptions = {
      sameSite: 'none',
      secure: true,
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    };

    res.cookie('cookie test', 'cookie test content', cookieOptions);
    res.cookie('sessionID', req.sessionID, cookieOptions);
    await redisClient.set(req.sessionID, address, 'EX', 60 * 60);
    return res.status(200).json('Login Successful!');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

userRouter.get('/nonce', async (req, res, next) => {
  try {
    const address = req.query.address as string;
    if (!isValidAddress(address)) {
      res.status(403).json('You Must provide Valid Address to get Nonce');
    }
    let user = await userRepository.findOneBy({ address });
    if (!user) {
      const currentTime = Math.floor(Date.now() / 1000);

      user = userRepository.create({
        address: address,
        boughtCount: 0,
        soldCount: 0,
        createdAt: currentTime,
        updatedAt: currentTime,
      });
    }
    user.nonce = getNonce();
    await userRepository.save(user);
    return res.status(200).json({ nonce: user.nonce });
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

userRouter.get('/logout', async (req, res, next) => {
  try {
    await redisClient.del(req.cookies.sessionID);
    res.clearCookie(req.cookies.sessionId);
    return res.status(200).json('Logout successful!');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default userRouter;
