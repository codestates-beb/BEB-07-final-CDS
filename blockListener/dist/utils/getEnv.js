"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (key, alternative) => {
    if (!key) {
        throw new Error('You must provide key argument');
    }
    if (!process.env[key] && !alternative) {
        const message = `No ${key} Variable and No alternatives provided`;
        throw new Error(message);
    }
    return process.env[key] || alternative;
};
//# sourceMappingURL=getEnv.js.map