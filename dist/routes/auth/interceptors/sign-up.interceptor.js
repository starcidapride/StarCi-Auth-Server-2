"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpInterceptor = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
let SignUpInterceptor = exports.SignUpInterceptor = class SignUpInterceptor {
    intercept(context, next) {
        const data = context.switchToHttp().getRequest().body;
        const { email, password, confirm, username, firstName, lastName } = data;
        const errors = {};
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!email.match(emailRegex)) {
            errors.emailError = 'Invalid email format (abc@xyz.gh).';
        }
        const passwordLengthRegex = /^.{6,20}$/;
        const passwordSpecialCharRegex = /^(?=.*?[A-Z])(?=.*?[!@#$%^&*()_+~`|}{\\[\]\\:;“’<,>.?/]).*$/;
        if (!(password.match(passwordLengthRegex) || password.match(passwordSpecialCharRegex))) {
            errors.passwordError = 'Password must be between 6 and 20 characters and contain at least one uppercase letter and one special character.';
        }
        else if (!password.match(passwordLengthRegex)) {
            errors.passwordError = 'Password must be between 6 and 20 characters.';
        }
        else if (!password.match(passwordSpecialCharRegex)) {
            errors.passwordError = 'Password must contain at least one uppercase letter and one special character.';
        }
        else if (confirm != password) {
            errors.confirmError = 'Password and confirmation do not match.';
        }
        const usernameLengthRegex = /^.{6,20}$/;
        if (!(username.match(usernameLengthRegex))) {
            errors.usernameError = 'Username must be between 6 and 20 characters.';
        }
        const nameRegex = /^.{2,50}$/;
        if (!firstName.match(nameRegex)) {
            errors.firstNameError = 'First name must be between 2 and 50 characters.';
        }
        if (!lastName.match(nameRegex)) {
            errors.lastNameError = 'Last name must be between 2 and 50 characters.';
        }
        if (!(0, lodash_1.isEmpty)(errors)) {
            throw new common_1.HttpException(errors, common_1.HttpStatus.BAD_REQUEST);
        }
        return next.handle();
    }
};
exports.SignUpInterceptor = SignUpInterceptor = __decorate([
    (0, common_1.Injectable)()
], SignUpInterceptor);
//# sourceMappingURL=sign-up.interceptor.js.map