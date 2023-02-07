import express from 'express';
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';

import isLoggedIn from '../middlewares/isLoggedIn';
import { AppDataSource } from '../data-source';
import { Users } from '../entities/Users';
const userRepository = AppDataSource.getRepository(Users);
const userRouter = express.Router();

const getNonce = () => {
  return Math.floor(Math.random() * 1e9);
};

const isValidAddress = (address: string): boolean => {
  const re = /0x[\d\w]{40}/i;
  return re.test(address);
};

function isValidEmail(email: string): boolean {
  const re = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;
  return re.test(email);
}

userRouter.post('/my', isLoggedIn, async (req, res, next) => {
  const { email, nickname } = req.body;
  if (!isValidEmail(email) && !nickname) {
    return res.status(403).json('Neither email nor nickname provided');
  }
  const { address } = req.session;
  const user = await userRepository.findOneBy({ address });
  if (!user) return res.status(403).json('no such user');
  if (isValidEmail(email)) user.email = email;
  if (nickname) user.nickname = nickname;
  await userRepository.save(user);
  return res.status(200).json('User Update Successful');
});

userRouter.post('/login', async (req, res, next) => {
  try {
    const { address, signature } = req.body;
    console.log(address, signature);
    // if (!address || !signature) {
    //   return res.status(403).json('You Must POST both address and signature');
    // }
    // const user = await userRepository.findOneBy({ address });
    // if (!user || !user.nonce) {
    //   return res.status(403).json('You Must ask for Nonce before logging in');
    // }
    // const nonce = user.nonce;
    // user.nonce = null;
    // await userRepository.save(user);

    // const msgBufferHex = bufferToHex(Buffer.from('sign: ' + nonce.toString()));
    // const parsedAddress = recoverPersonalSignature({
    //   data: msgBufferHex,
    //   sig: signature,
    // });
    // console.log({ parsedAddress });
    // if (parsedAddress.toLowerCase() !== address.toLowerCase()) {
    //   return res
    //     .status(403)
    //     .json('Login Failed : Signature from invalid address');
    // }
    res.cookie('cookie test', 'cookie test content', {
      sameSite: 'none',
      secure: true,
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
    });
    req.session.address = address;
    console.log(req.session);
    return res.status(200).json('Login Successful!');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

userRouter.get('/my', isLoggedIn, async (req, res, next) => {
  const user = await userRepository.findOneBy({ address: req.session.address });
  if (!user) return res.status(404).json('no such user');
  return res.status(200).json(user);
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
  req.session.destroy(() => {
    res.status(200).json('Logout Success');
  });
});

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
