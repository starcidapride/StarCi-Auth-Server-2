import { JwtService } from '@nestjs/jwt';
export declare class MailerService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    private generateVerifyToken;
    private transporter;
    private mailOptions;
    sendMail(email: string): Promise<void>;
}
