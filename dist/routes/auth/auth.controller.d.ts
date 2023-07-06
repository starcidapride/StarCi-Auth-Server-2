import { AuthService } from '@routes/auth/auth.service';
import { AuthTokenSet, PresentableUser, SignInResponse, SignUpRequest } from '@apptypes/auth.type';
import { User } from '@prisma/client';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    handleSignIn(user: User): Promise<SignInResponse>;
    handleSignUp(body: SignUpRequest): Promise<PresentableUser>;
    handleVerify(email: string, token: string, res: Response): Promise<void>;
    handleRefresh(authHeader: string): Promise<AuthTokenSet>;
    handleInit(user: User): Promise<PresentableUser>;
}
