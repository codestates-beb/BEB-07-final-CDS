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
function isLoggedIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.cookies.sessionID) {
            console.log('isLoggedIn triggered');
            console.log(req.cookies.sessionID);
            return next();
        }
        else {
            return res.status(403).send('You need to login First');
        }
    });
}
exports.default = isLoggedIn;
//# sourceMappingURL=isLoggedIn.js.map