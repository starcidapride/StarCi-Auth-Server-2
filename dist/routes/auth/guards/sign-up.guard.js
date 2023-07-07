"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpGuard = void 0;
const common_1 = require("@nestjs/common");
let SignUpGuard = exports.SignUpGuard = class SignUpGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const body = request.body;
        if (this.isSignUpRequest(body)) {
            return true;
        }
        return false;
    }
    isSignUpRequest(body) {
        const castedBody = body;
        return (castedBody.email !== undefined &&
            castedBody.password !== undefined &&
            castedBody.confirm !== undefined &&
            castedBody.username !== undefined &&
            castedBody.firstName !== undefined &&
            castedBody.lastName !== undefined);
    }
};
exports.SignUpGuard = SignUpGuard = __decorate([
    (0, common_1.Injectable)()
], SignUpGuard);
//# sourceMappingURL=sign-up.guard.js.map