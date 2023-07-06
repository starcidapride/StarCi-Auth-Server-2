"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const local_strategy_1 = require("./strategies/local.strategy");
const user_db_service_1 = require("../../database/user.db.service");
const prisma_service_1 = require("../../database/prisma.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const jwt_1 = require("@nestjs/jwt");
const sha256_service_1 = require("../../utils/sha256.service");
const refresh_token_db_service_1 = require("../../database/refresh-token.db.service");
const mailer_service_1 = require("./mailer/mailer.service");
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            user_db_service_1.UserDbService,
            prisma_service_1.PrismaService,
            jwt_1.JwtService,
            refresh_token_db_service_1.RefreshTokenDbService,
            sha256_service_1.CryptoService,
            mailer_service_1.MailerService
        ],
        controllers: [auth_controller_1.AuthController]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map