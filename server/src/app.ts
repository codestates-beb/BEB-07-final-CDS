import express, { Request, Response } from 'express';
import createError from 'http-errors';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import cookieParser from 'cookie-parser';

import getEnv from './utils/getEnv';
import redisClient from './utils/redisClient';
import routers from './routes';

const { devRouter, userRouter, swapRouter, transactionRouter, priceRouter } =
  routers;
const port = getEnv('PORT', '5050');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', port);
// app.use(session());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://cds-client.s3-website.ap-northeast-2.amazonaws.com',
      'https://d999baeavtte2.cloudfront.net',
    ],
    credentials: true,
  }),
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dev', devRouter);
app.use('/users', userRouter);
app.use('/swaps', swapRouter);
app.use('/transactions', transactionRouter);
app.use('/prices', priceRouter);

app.use('/health', (req, res, next) => {
  return res.status(200).json({ message: 'health check success!' });
});

app.use(function (req, res, next) {
  next(createError(404, 'There is no router'));
});

app.use((err: any, req: Request, res: Response, _) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  return res.status(err.status || 500).json(err.message);
});

export default app;
