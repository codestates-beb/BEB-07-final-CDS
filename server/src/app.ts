import express, { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectRedis from 'connect-redis';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import getEnv from './utils/getEnv';
import redisClient from './utils/redisClient';
import routers from './routes';

declare module 'express-session' {
  export interface SessionData {
    address: string;
  }
}
const { authRouter, userRouter, swapRouter, transactionRouter, priceRouter } =
  routers;
const port = getEnv('PORT', '5050');
const RedisStore = connectRedis(session);

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', port);

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
app.use(cookieParser(getEnv('COOKIE_SECRET')));
app.use(
  session({
    secret: getEnv('COOKIE_SECRET'),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    },
    store: new RedisStore({ client: redisClient as any }),
  }),
);
app.use(express.static(path.join(__dirname, 'public')));

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', 'cds.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth', authRouter);
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

app.use((err: any, req: Request, res: Response, _: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  return res.status(err.status || 500).json(err.message);
});

export default app;
