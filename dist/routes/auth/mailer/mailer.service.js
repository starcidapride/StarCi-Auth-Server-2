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
exports.MailerService = void 0;
const jwt_config_1 = require("../../../config/jwt.config");
const mailer_config_1 = require("../../../config/mailer.config");
const server_config_1 = require("../../../config/server.config");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const nodemailer_1 = require("nodemailer");
let MailerService = exports.MailerService = class MailerService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.transporter = (0, nodemailer_1.createTransport)({
            service: 'gmail',
            auth: {
                user: (0, mailer_config_1.default)().mailerUser,
                pass: (0, mailer_config_1.default)().mailerPass
            }
        });
        this.mailOptions = (email) => {
            const serverURL = (0, server_config_1.default)().serverUrl;
            const token = this.generateVerifyToken(email);
            return {
                from: 'starcidapride@gmail.com',
                to: email,
                subject: 'REGISTRATION CONFIRMATION - STARCI',
                html: `
			<p>Dear ${email},</p>
			<p>To complete your registration, please click on the confirmation link below:</p>
			<a href="${serverURL}auth/verify-email?email=${email}&token=${token}">Here</a>
			<p>If you did not sign up for StarCi, you can ignore this email.</p>
			<p>Best regards,</p>
			<p>Tu Cuong</p>
			<p>Founder of StarCi</p>`
            };
        };
    }
    generateVerifyToken(email) {
        const payload = { email };
        return this.jwtService.sign(payload, {
            expiresIn: (0, jwt_config_1.default)().verifyTokenExpiryTime,
            secret: (0, jwt_config_1.default)().secret,
        });
    }
    async sendMail(email) {
        this.transporter.sendMail(this.mailOptions(email));
    }
};
exports.MailerService = MailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], MailerService);
//# sourceMappingURL=mailer.service.js.map