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
exports.UserDbService = void 0;
const prisma_service_1 = require("./prisma.service");
const common_1 = require("@nestjs/common");
let UserDbService = exports.UserDbService = class UserDbService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getUser(data) {
        try {
            return await this.prismaService.user.findFirstOrThrow({
                where: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, ((data === null || data === void 0 ? void 0 : data.email) && { email: data.email })), ((data === null || data === void 0 ? void 0 : data.password) && { password: data.password })), ((data === null || data === void 0 ? void 0 : data.bio) && { bio: data.bio })), ((data === null || data === void 0 ? void 0 : data.username) && { username: data.username })), ((data === null || data === void 0 ? void 0 : data.firstName) && { firstName: data.firstName })), ((data === null || data === void 0 ? void 0 : data.lastName) && { lastName: data.lastName })), ((data === null || data === void 0 ? void 0 : data.picture) && { picture: data.picture })), ((data === null || data === void 0 ? void 0 : data.verified) && { isVerified: data.verified }))
            });
        }
        catch (ex) {
            console.log(ex);
            return null;
        }
    }
    async createUser(data) {
        try {
            const user = await this.prismaService.user.create({
                data
            });
            return { createResult: true, user };
        }
        catch (ex) {
            const errors = {};
            if (ex.code === 'P2002') {
                const uniqueField = ex.meta.target;
                if (uniqueField === 'User_email_key') {
                    errors.emailError = 'Email already exists';
                }
                else if (uniqueField === 'User_username_key') {
                    errors.usernameError = 'Username already taken';
                }
            }
            return { createResult: false, errors };
        }
    }
    async updateUser(email, data) {
        try {
            return this.prismaService.user.update({
                where: { email },
                data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, ((data === null || data === void 0 ? void 0 : data.password) && { password: data.password })), ((data === null || data === void 0 ? void 0 : data.username) && { username: data.username })), ((data === null || data === void 0 ? void 0 : data.bio) && { bio: data.bio })), ((data === null || data === void 0 ? void 0 : data.firstName) && { firstName: data.firstName })), ((data === null || data === void 0 ? void 0 : data.lastName) && { lastName: data.lastName })), ((data === null || data === void 0 ? void 0 : data.image) && { picture: data.image })), ((data === null || data === void 0 ? void 0 : data.verified) && { verified: data.verified }))
            });
        }
        catch (ex) {
            return null;
        }
    }
};
exports.UserDbService = UserDbService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserDbService);
//# sourceMappingURL=user.db.service.js.map