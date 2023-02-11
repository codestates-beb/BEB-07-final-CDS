"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Swaps_1 = require("../entities/Swaps");
const inputValidators_1 = require("../utils/inputValidators");
const swapRepository = data_source_1.AppDataSource.getRepository(Swaps_1.Swaps);
const swapController = {
    getBySwapId: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const swapId = +req.params.swapId;
            const singleSwap = yield swapRepository.findOneBy({ swapId });
            return res.status(200).json(singleSwap);
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { order, offset, limit, status, address, seller, buyer } = req.query;
        // set default order as DESC
        const filteredOrder = order === 'ASC' ? 'ASC' : 'DESC';
        const filteredOffset = offset ? +offset : 0;
        const filteredLimit = limit ? +limit : 10;
        const filteredAddress = (0, inputValidators_1.isValidAddress)(address)
            ? address
            : null;
        const filteredSeller = (0, inputValidators_1.isValidAddress)(seller)
            ? seller
            : null;
        const filteredBuyer = (0, inputValidators_1.isValidAddress)(buyer) ? buyer : null;
        console.log({
            filteredAddress,
        });
        try {
            let swapQuery = swapRepository.createQueryBuilder('swaps');
            if (filteredAddress) {
                swapQuery = swapQuery
                    .where(filteredAddress ? 'swaps.buyer = :filteredAddress' : '1=1', {
                    filteredAddress,
                })
                    .orWhere(filteredAddress ? 'swaps.seller = :filteredAddress' : '1=1', { filteredAddress });
            }
            else if (filteredBuyer) {
                swapQuery = swapQuery.where(filteredBuyer ? 'swaps.buyer = :filteredBuyer' : '1=1', {
                    filteredBuyer,
                });
            }
            else if (filteredSeller) {
                swapQuery = swapQuery.andWhere(filteredSeller ? 'swaps.seller = :filteredSeller' : '1=1', {
                    filteredSeller,
                });
            }
            if (status) {
                swapQuery = swapQuery.andWhere(status ? 'swaps.status = :status' : '1=1', { status });
            }
            swapQuery = swapQuery
                .orderBy('swaps.createdAt', filteredOrder)
                .offset(filteredOffset)
                .limit(filteredLimit);
            const filteredSwaps = yield swapQuery.getManyAndCount();
            return res.status(200).json({
                totalSwapCount: yield swapRepository.count(),
                filteredSwapCount: filteredSwaps[1],
                swaps: filteredSwaps[0],
                offset: filteredOffset,
                limit: filteredLimit,
                statusFilter: status ? status : 'all',
                addressFilter: filteredAddress,
                sellerFilter: filteredSeller,
                buyerFilter: filteredBuyer,
            });
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
};
exports.default = swapController;
//# sourceMappingURL=swapController.js.map