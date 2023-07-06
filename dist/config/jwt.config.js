"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    secret: process.env.SECRET,
    accessTokenExpiryTime: process.env.ACCESS_TOKEN_EXPIRY_TIME,
    refreshTokenExpiryTime: process.env.REFRESH_TOKEN_EXPIRY_TIME,
    verifyTokenExpiryTime: process.env.VERIFY_TOKEN_EXPIRY_TIME
});
//# sourceMappingURL=jwt.config.js.map