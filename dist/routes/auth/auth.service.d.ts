import { CryptoService } from '@utils/sha256.service';
import { UserDbService } from '@database/user.db.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenSet, PresentableUser, SignInResponse, SignUpRequest, VerifyResponse } from '@apptypes/auth.type';
import { RefreshTokenDbService } from '@database/refresh-token.db.service';
import { MailerService } from '@routes/auth/mailer/mailer.service';
export declare class AuthService {
    private readonly userDbService;
    private readonly jwtService;
    private readonly refreshTokenDbService;
    private readonly mailerService;
    private readonly cryptoService;
    constructor(userDbService: UserDbService, jwtService: JwtService, refreshTokenDbService: RefreshTokenDbService, mailerService: MailerService, cryptoService: CryptoService);
    validateUser(email: string, password: string): Promise<User>;
    private generateAuthTokenSet;
    processSignIn(user: User): Promise<SignInResponse>;
    processSignUp(data: SignUpRequest): Promise<PresentableUser>;
    processRefresh(refreshToken: string): Promise<AuthTokenSet>;
    processVerify(email: string, token: string): Promise<VerifyResponse>;
    processInit(user: User): Promise<PresentableUser>;
}
