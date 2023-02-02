// import npm packages
const express = require('express');
const createError = require('http-errors');
const axios = require('axios');
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
const redisClient = require('./utils/redisClient');
const { getPricesFromChainLink } = require('./web3Utils/index');

// import env variables
const env = getEnv('NODE_ENV', 'development');
const port = getEnv('PORT', 5050);

const app = express();

//setup sequelize
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
  updateGeckoFeed();
  updateChainLinkFeed();
  setInterval(() => {
    updateGeckoFeed();
    updateChainLinkFeed();
  }, 20 * 1000);
  console.log(app.get('port'), 'is up and listening');
});

async function updateGeckoFeed() {
  try {
    const apiData = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,chainlink&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true&precision=2',
    );
    const priceData = apiData.data;
    priceData.bitcoin.usd_24h_change =
      +priceData.bitcoin.usd_24h_change.toFixed(3);
    priceData.ethereum.usd_24h_change =
      +priceData.ethereum.usd_24h_change.toFixed(3);
    priceData.chainlink.usd_24h_change =
      +priceData.chainlink.usd_24h_change.toFixed(3);
    await redisClient.set(
      'geckoPrices',
      JSON.stringify(priceData),
      'EX',
      60 * 60,
    );
    console.log('Gecko Price Feed updated');
  } catch (err) {
    console.log('Error while updating Gecko price feed');
    console.error(err);
  }
}
async function updateChainLinkFeed() {
  try {
    const priceData = await getPricesFromChainLink();
    const bitcoin = {
      usd: +(+priceData.BTC / 10e8).toFixed(2),
      last_updated_at: new Date().getTime(),
    };
    const ethereum = {
      usd: +(+priceData.ETH / 10e8).toFixed(2),
      last_updated_at: new Date().getTime(),
    };
    const chainlink = {
      usd: +(+priceData.LINK / 10e8).toFixed(2),
      last_updated_at: new Date().getTime(),
    };
    const prices = { bitcoin, ethereum, chainlink };
    await redisClient.set('linkPrices', JSON.stringify(prices), 'EX', 60 * 60);
    console.log('Chain Link Price Feed updated');
  } catch (err) {
    console.log('Error while updating Chain Link price feed');
    console.error(err);
  }
}

module.exports = app;
