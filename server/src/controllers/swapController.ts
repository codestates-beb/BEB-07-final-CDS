import { Request, Response, NextFunction } from 'express';

import { AppDataSource } from '../data-source';
import { Swaps } from '../entities/Swaps';
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

    const filteredSeller: string | null = isValidAddress(seller)
      ? seller
      : null;
    const filteredBuyer: string | null = isValidAddress(buyer) ? buyer : null;

    try {
      let swapQuery = swapRepository.createQueryBuilder('swaps').select();
      if (filteredAddress) {
        swapQuery = swapQuery
          .where(filteredAddress ? 'swaps.buyer = :filteredAddress' : '1=1', {
            filteredAddress,
          })
          .orWhere(
            filteredAddress ? 'swaps.seller = :filteredAddress' : '1=1',
            { filteredAddress },
          );
      } else if (filteredBuyer) {
        swapQuery = swapQuery.where(
          filteredBuyer ? 'swaps.buyer = :filteredBuyer' : '1=1',
          {
            filteredBuyer,
          },
        );
      } else if (filteredSeller) {
        swapQuery = swapQuery.andWhere(
          filteredSeller ? 'swaps.seller = :filteredSeller' : '1=1',
          {
            filteredSeller,
          },
        );
      }

      if (status) {
        swapQuery = swapQuery.andWhere(
          status ? 'swaps.status = :status' : '1=1',
          { status },
        );
      }
      swapQuery = swapQuery
        .orderBy('swaps.createdAt', filteredOrder)
        .offset(filteredOffset)
        .limit(filteredLimit);

      const filteredSwaps = swapQuery.getManyAndCount();
      return res.status(200).json({
        totalSwapCount: await swapRepository.count(),
        filteredSwapCount: filteredSwaps[1],
        swaps: filteredSwaps[0],
        offset: filteredOffset,
        limit: filteredLimit,
        statusFilter: status ? status : 'all',
        addressFilter: filteredAddress,
        sellerFilter: filteredSeller,
        buyerFilter: filteredBuyer,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};

export default swapController;
