"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const sha256_service_1 = require("../../utils/sha256.service");
const user_db_service_1 = require("../../database/user.db.service");
const jwt_config_1 = require("../../config/jwt.config");
const jwt_1 = require("@nestjs/jwt");
const refresh_token_db_service_1 = require("../../database/refresh-token.db.service");
const mailer_service_1 = require("./mailer/mailer.service");
const jsonwebtoken_1 = require("jsonwebtoken");
let AuthService = exports.AuthService = class AuthService {
    constructor(userDbService, jwtService, refreshTokenDbService, mailerService, cryptoService) {
        this.userDbService = userDbService;
        this.jwtService = jwtService;
        this.refreshTokenDbService = refreshTokenDbService;
        this.mailerService = mailerService;
        this.cryptoService = cryptoService;
    }
    async validateUser(email, password) {
        const hashedPassword = this.cryptoService.createHashSHA256(password);
        const user = await this.userDbService.getUser({
            email,
            password: hashedPassword
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Incorrect username or password.');
        }
        return user;
    }
    async generateAuthTokenSet(email) {
        const payload = { email };
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: (0, jwt_config_1.default)().accessTokenExpiryTime,
            secret: (0, jwt_config_1.default)().secret,
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: (0, jwt_config_1.default)().refreshTokenExpiryTime,
            secret: (0, jwt_config_1.default)().secret,
        });
        return { accessToken, refreshToken };
    }
    async processSignIn(user) {
        const authTokenSet = await this.generateAuthTokenSet(user.email);
        if (!user.verified) {
            throw new common_1.UnauthorizedException('Prior to continuing, it\'s important that you verify your account through your email. Furthermore, we have sent you another email as a backup option in case you have misplaced or cannot locate the initial email.');
        }
        const presentableUser = Object.assign(Object.assign(Object.assign({ email: user.email, username: user.username }, (user.image && { image: user.image })), (user.bio && { bio: user.bio })), { firstName: user.firstName, lastName: user.lastName });
        await this.refreshTokenDbService.addToken({ email: user.email, token: authTokenSet.refreshToken });
        return { authTokenSet, presentableUser };
    }
    async processSignUp(data) {
        const { email, password, username, firstName, lastName } = data;
        const hashedPassword = this.cryptoService.createHashSHA256(password);
        const user = {
            email,
            password: hashedPassword,
            username,
            firstName,
            lastName,
            verified: false
        };
        const createdUser = await this.userDbService.createUser(user);
        const createdResult = createdUser.createResult;
        if (createdResult === false) {
            throw new common_1.HttpException(createdUser.errors, common_1.HttpStatus.CONFLICT);
        }
        await this.mailerService.sendMail(email);
        return {
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        };
    }
    async processRefresh(refreshToken) {
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: (0, jwt_config_1.default)().secret
            });
        }
        catch (ex) {
            throw new common_1.HttpException('The refresh token has either expired or is invalid.', common_1.HttpStatus.UNAUTHORIZED);
        }
        const email = payload.email;
        const tokenSet = await this.generateAuthTokenSet(email);
        await this.refreshTokenDbService.addToken({
            token: tokenSet.refreshToken,
            email
        });
        return tokenSet;
    }
    async processVerify(email, token) {
        try {
            const decoded = this.jwtService.verify(token, { secret: (0, jwt_config_1.default)().secret });
            const verified = (await this.userDbService.getUser({ email: decoded.email })).verified;
            if (verified) {
                return 'already confirmed';
            }
            else {
                await this.userDbService.updateUser(email, { verified: true });
                return 'success';
            }
        }
        catch (ex) {
            if (ex instanceof jsonwebtoken_1.TokenExpiredError) {
                return 'time out';
            }
            else {
                return 'not found';
            }
        }
    }
    async processInit(user) {
        return Object.assign(Object.assign(Object.assign({ email: user.email, username: user.username }, (user.image && { image: user.image })), (user.bio && { bio: user.bio })), { firstName: user.firstName, lastName: user.lastName });
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_db_service_1.UserDbService,
        jwt_1.JwtService,
        refresh_token_db_service_1.RefreshTokenDbService,
        mailer_service_1.MailerService,
        sha256_service_1.CryptoService])
], AuthService);
//# sourceMappingURL=auth.service.js.map