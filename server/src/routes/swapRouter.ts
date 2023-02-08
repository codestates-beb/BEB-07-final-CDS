import express from 'express';

import swapController from '../controllers/swapController';

const swapRouter = express.Router();

swapRouter.get('/:swapId', swapController.getBySwapId);
swapRouter.get('/', swapController.getAll);

export default swapRouter;
