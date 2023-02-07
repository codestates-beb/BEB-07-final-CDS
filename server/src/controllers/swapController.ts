import { all } from 'axios';
import { Address } from 'ethereumjs-util';
import { Request, Response, NextFunction } from 'express';
import { off } from 'process';

import { AppDataSource } from '../data-source';
import { Swaps } from '../entities/Swaps';
import { Users } from '../entities/Users';
import { isValidAddress } from '../utils/inputValidators';

const swapRepository = AppDataSource.getRepository(Swaps);

const swapController = {
  getBySwapId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const swapId = +req.params.swapId;
      const singleSwap = await swapRepository.findOneBy({ swapId });
      return res.status(200).json(singleSwap);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  getAll: async (
    req: Request<
      any,
      any,
      any,
      {
        offset: string | null;
        limit: string | null;
        status: string | null;
        order: string | null;
        address: string | null;
        buyer: string | null;
        seller: string | null;
      }
    >,
    res: Response,
    next: NextFunction,
  ) => {
    const { order, offset, limit, status, address, seller, buyer } = req.query;

    // set default order as DESC
    const filteredOrder: 'ASC' | 'DESC' = order === 'ASC' ? 'ASC' : 'DESC';
    const filteredOffset: number = offset ? +offset : 0;
    const filteredLimit: number = limit ? +limit : 10;

    const filteredAddress: string | null = isValidAddress(address)
      ? address
      : null;

    // const filteredSeller: string | null = isValidAddress(seller)
    //   ? seller
    //   : null;
    // const filteredBuyer: string | null = isValidAddress(buyer) ? buyer : null;

    try {
      const filteredSwaps = await swapRepository
        .createQueryBuilder('swaps')
        .select()
        .where(filteredAddress ? 'swaps.buyer = :filteredAddress' : '1=1', {
          filteredAddress,
        })
        .orWhere(filteredAddress ? 'swaps.seller = :filteredAddress' : '1=1', {
          filteredAddress,
        })
        .andWhere(status ? 'swaps.status = :status' : '1=1', { status })
        .orderBy('swaps.createdAt', filteredOrder)
        .offset(filteredOffset)
        .limit(filteredLimit)
        .getManyAndCount();
      return res.status(200).json({
        totalSwapCount: await swapRepository.count(),
        filteredSwapCount: filteredSwaps[1],
        swaps: filteredSwaps[0],
        offset: filteredOffset,
        limit: filteredLimit,
        statusFilter: status ? status : 'all',
        addressFilter: filteredAddress,
        // sellerFilter: seller,
        // buyerFilter: buyer,
      });

      // try {
      //   const filteredSwaps = await swapRepository
      //     .createQueryBuilder('swaps')
      //     .select()
      //     .where(status ? 'swaps.status = :status' : '1=1', { status })
      //     .andWhere(filteredSeller ? 'swaps.buyer = :filteredSeller' : '1=1', {
      //       filteredSeller,
      //     })
      //     .andWhere(filteredBuyer ? 'swaps.seller = :filteredBuyer' : '1=1', {
      //       filteredBuyer,
      //     })
      //     .orderBy('swaps.createdAt', filteredOrder)
      //     .offset(filteredOffset)
      //     .limit(filteredLimit)
      //     .getManyAndCount();
      //   return res.status(200).json({
      //     totalSwapCount: await swapRepository.count(),
      //     filteredSwapCount: filteredSwaps[1],
      //     swaps: filteredSwaps[0],
      //     offset: filteredOffset,
      //     limit: filteredLimit,
      //     filter: status ? status : 'all',
      //   });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};

export default swapController;
