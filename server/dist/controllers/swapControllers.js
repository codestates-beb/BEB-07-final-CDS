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
        try {
            const allSwaps = yield swapRepository.find({});
            return res.status(200).json(allSwaps);
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
};
exports.default = swapController;
//# sourceMappingURL=swapControllers.js.map