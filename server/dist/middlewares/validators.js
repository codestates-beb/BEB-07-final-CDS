"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = exports.isValidAddress = void 0;
function isValidAddress(address) {
    const re = /0x[\d\w]{40}/i;
    return re.test(address);
}
exports.isValidAddress = isValidAddress;
function isValidEmail(email) {
    const re = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;
    return re.test(email);
}
exports.isValidEmail = isValidEmail;
//# sourceMappingURL=validators.js.map