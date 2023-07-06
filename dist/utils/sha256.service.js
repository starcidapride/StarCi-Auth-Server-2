"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const crypto_config_1 = require("../config/crypto.config");
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let CryptoService = exports.CryptoService = class CryptoService {
    createHashSHA256(message) {
        return (0, crypto_1.createHash)('sha256').update((0, crypto_config_1.default)().salt + message).digest('hex');
    }
    verifyHashSHA256(message, hash) {
        const calculatedHash = this.createHashSHA256(message);
        return (calculatedHash === hash);
    }
};
exports.CryptoService = CryptoService = __decorate([
    (0, common_1.Injectable)()
], CryptoService);
//# sourceMappingURL=sha256.service.js.map