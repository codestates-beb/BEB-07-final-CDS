const express = require('express');
const createError = require('http-errors');
require('dotenv').config();

const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const ejs = require('ejs');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const { sequelize } = require('./models');
const getEnv = require('./utils/getEnv');
const devRouter = require('./routes/devRouter');

const env = getEnv('env', 'development');
const port = getEnv('port', 5050);
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', port);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dev', devRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'there is no router'));
});

// error handler
// app.use((req, res, next) => {
//   const err = new Error(`${req.method} ${req.url} There is no Router`);
//   err.status = 404;
//   next(err);
// });

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  return res.status(err.status || 500).json(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'is up and listening');
});

module.exports = app;

// require('dotenv').config();

// const testRouter = require('./routes/testRouter');
// const testRouterV2 = require('./routes/testRouterV2');
// const web3Router = require('./routes/web3Router');

// const naverRouter = require('./routes/naverRouter');
// const userRouter = require('./routes/userRouter');
// const nftRouter = require('./routes/nftRouter');
// const postRouter = require('./routes/postRouter');
// const tokenRouter = require('./routes/tokenRouter');

// const logger = require('./logger');

app.set('port', process.env.PORT || 5050);
// app.set('view engine', 'ejs');

// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log('데이터베이스 연결 성공.');
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// app.use(morgan('dev'));
// app.use(
//   cors({
//     origin: [
//       'http://localhost:3000',
//       'http://ewe-client.s3-website.ap-northeast-2.amazonaws.com',
//       'http://d32mzbbvr51cku.cloudfront.net',
//       'https://d32mzbbvr51cku.cloudfront.net',
//       'http://d3t5y0jgzx6lw2.cloudfront.net',
//       'https://d3t5y0jgzx6lw2.cloudfront.net',
//     ],
//     credentials: true,
//   }),
// );
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser(process.env.COOKIE_SECRET));
// // app.use(
// //   session({
// //     resave: false,
// //     saveUninitialized: false,
// //     secret: process.env.COOKIE_SECRET,
// //     cookie: {
// //       httpOnly: true,
// //       secure: true,
// //     },
// //   }),
// // );

// // test routers
// app.use('/test', testRouter);
// app.use('/testv2', testRouterV2);
// app.use('/web3', web3Router);

// // production router
// app.use('/health', (req, res, next) => {
//   return res.status(200).json({ message: 'ok', data: null });
// });

// app.use('/naver', naverRouter);
// app.use('/users', userRouter);
// app.use('/nfts', nftRouter);
// app.use('/posts', postRouter);
// app.use('/token', tokenRouter);

// module.exports = app;
