import express from 'express';
import transactionController from '../controllers/transactionController';

const transactionRouter = express.Router();

transactionRouter.get('/:txHash', transactionController.getByTxHash);
transactionRouter.get('/', transactionController.getAll);

export default transactionRouter;
