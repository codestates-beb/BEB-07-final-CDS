import express from 'express';

import priceController from '../controllers/priceController';
const priceRouter = express.Router();

priceRouter.get('/coingecko', priceController.getCoinGecko);
priceRouter.get('/chainlink', priceController.getChainLink);

export default priceRouter;
