import { CookieOptions, NextFunction, Request, Response } from 'express';
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';

import redisClient from '../utils/redisClient';
import { AppDataSource } from '../data-source';
import { Users } from '../entities/Users';
import { getNonce } from '../utils/getNonce';
import { isValidAddress } from '../utils/inputValidators';

const cookieOptions: CookieOptions = {
  sameSite: 'none',
  secure: true,
  maxAge: 60 * 60 * 1000,
  httpOnly: true,
};

const userRepository = AppDataSource.getRepository(Users);

const authController = {
  getNonce: async (req: Request, res: Response, next: NextFunction) => {
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
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { address, signature } = req.body;
      console.log(address, signature);
      if (!isValidAddress(address) || !signature) {
        return res
          .status(403)
          .json('You Must POST both valid address and signature');
      }
      const user = await userRepository.findOneBy({ address });
      if (!user || !user.nonce) {
        return res.status(403).json('You Must ask for Nonce before logging in');
      }
      const nonce = user.nonce;
      user.nonce = null;
      await userRepository.save(user);

      const msgBufferHex = bufferToHex(
        Buffer.from('sign: ' + nonce.toString()),
      );
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
      res.cookie('sessionID', req.sessionID, cookieOptions);
      await redisClient.set(req.sessionID, address, 'EX', 60 * 60);
      return res.status(200).json('Login Successful!');
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await redisClient.del(req.cookies.sessionID);
      res.clearCookie(req.cookies.sessionID);
      return res.status(200).json('Logout successful!');
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  verify: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const address = await redisClient.get(req.cookies.sessionID);
      if (!address) {
        return res
          .status(404)
          .json('You Do NOT have valid login cookie, please login again');
      }

      const user = await userRepository.findOneBy({ address });
      if (!user) {
        return res
          .status(404)
          .json('You Do NOT have valid login cookie, please login again');
      }

      // if correct login info, clear cookie and reissue
      res.clearCookie(req.cookies.sessionID);
      await redisClient.del(req.cookies.sessionID);

      res.cookie('sessionID', req.sessionID, cookieOptions);
      await redisClient.set(req.sessionID, address, 'EX', 60 * 60);
      return res.status(200).json('Login Successful!');
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
export default authController;
