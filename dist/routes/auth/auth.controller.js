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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const local_guard_1 = require("./guards/local.guard");
const auth_service_1 = require("./auth.service");
const user_decorator_1 = require("../../decorators/user.decorator");
const sign_up_interceptor_1 = require("./interceptors/sign-up.interceptor");
const sign_up_guard_1 = require("./guards/sign-up.guard");
const jwt_guard_1 = require("./guards/jwt.guard");
const refresh_guard_1 = require("./guards/refresh.guard");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async handleSignIn(user) {
        return await this.authService.processSignIn(user);
    }
    async handleSignUp(body) {
        return await this.authService.processSignUp(body);
    }
    async handleVerify(email, token, res) {
        const verifyResult = await this.authService.processVerify(email, token);
        const templates = {
            'success': 'success',
            'already confirmed': 'already-confirmed',
            'time out': 'time-out',
            'not found': 'not-found'
        };
        const templateName = templates[verifyResult] || 'not-found';
        res.render(templateName, { email });
    }
    async handleRefresh(authHeader) {
        const refreshToken = authHeader.split(' ')[1];
        return await this.authService.processRefresh(refreshToken);
    }
    async handleInit(user) {
        return await this.authService.processInit(user);
    }
};
__decorate([
    (0, common_1.UseGuards)(local_guard_1.LocalAuthGuard),
    (0, common_1.Post)('sign-in'),
    __param(0, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleSignIn", null);
__decorate([
    (0, common_1.UseGuards)(sign_up_guard_1.SignUpGuard),
    (0, common_1.UseInterceptors)(sign_up_interceptor_1.SignUpInterceptor),
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleSignUp", null);
__decorate([
    (0, common_1.Get)('verify'),
    __param(0, (0, common_1.Query)('email')),
    __param(1, (0, common_1.Query)('token')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleVerify", null);
__decorate([
    (0, common_1.UseGuards)(refresh_guard_1.RefreshGuard),
    (0, common_1.Get)('refresh'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleRefresh", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('init'),
    __param(0, (0, user_decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleInit", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map