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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
function clearRecords(appDataSource) {
    var _a, e_1, _b, _c, _d, e_2, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (var _g = true, _h = __asyncValues(appDataSource.entityMetadatas), _j; _j = yield _h.next(), _a = _j.done, !_a;) {
                _c = _j.value;
                _g = false;
                try {
                    let table = _c;
                    const tableName = table.tableName;
                    const repo = appDataSource.getRepository(tableName);
                    if (tableName === 'users') {
                        const users = yield repo.find({});
                        try {
                            for (var _k = true, users_1 = (e_2 = void 0, __asyncValues(users)), users_1_1; users_1_1 = yield users_1.next(), _d = users_1_1.done, !_d;) {
                                _f = users_1_1.value;
                                _k = false;
                                try {
                                    let user = _f;
                                    user.email = user.email ? user.email : null;
                                    user.nickname = user.nickname ? user.nickname : null;
                                    user.soldCount = 0;
                                    user.boughtCount = 0;
                                    user.lastSold = null;
                                    user.lastBought = null;
                                    user.updatedAt = user.createdAt;
                                    user.nonce = null;
                                    yield appDataSource.manager.save(user);
                                }
                                finally {
                                    _k = true;
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (!_k && !_d && (_e = users_1.return)) yield _e.call(users_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                    else {
                        yield repo
                            .createQueryBuilder()
                            .delete()
                            .from(tableName)
                            .where('true=true')
                            .execute()
                            .then((log) => console.log(`${tableName} table cleared : `, log));
                    }
                }
                finally {
                    _g = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_g && !_a && (_b = _h.return)) yield _b.call(_h);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
exports.default = clearRecords;
//# sourceMappingURL=clearRecords.js.map