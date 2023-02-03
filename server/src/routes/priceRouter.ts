import express from 'express';

import redisClient from '../utils/redisClient';

const priceRouter = express.Router();

priceRouter.get('/coingecko', async (req, res, next) => {
  try {
    let cached = await redisClient.get('geckoPrices');
    return res.status(200).json(JSON.parse(cached));
  } catch (err) {
    return res.status(500).json({
      message:
        'Price feed outdated more than 1hr and not automatically updated, contact admin',
    });
  }
});

priceRouter.get('/chainlink', async (req, res, next) => {
  try {
    let cached = await redisClient.get('linkPrices');
    return res.status(200).json(JSON.parse(cached));
  } catch (err) {
    return res.status(500).json({
      message:
        'Price feed outdated more than 1hr and not automatically updated, contact admin',
    });
  }
});

export default priceRouter;
