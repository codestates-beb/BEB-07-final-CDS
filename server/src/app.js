// import npm packages
const express = require('express');
const createError = require('http-errors');
require('dotenv').config();

const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const ejs = require('ejs');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// import custom modules
const { sequelize } = require('./models');
const getEnv = require('./utils/getEnv');
const devRouter = require('./routes/devRouter');

// import env variables
const env = getEnv('NODE_ENV', 'development');
const port = getEnv('PORT', 5050);

const app = express();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB Connection Success!');
  })
  .catch((err) => {
    console.error(err);
  });

// view engine setup
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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dev', devRouter);
// app.use('/users', usersRouter);

app.use('/health', (req, res, next) => {
  return res.status(200).json({ message: 'health check success!' });
});

app.use(function (req, res, next) {
  next(createError(404, 'There is no router'));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  return res.status(err.status || 500).json(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'is up and listening');
});

module.exports = app;
