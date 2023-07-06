import { PrismaService } from './prisma.service';
import { RefreshToken } from '@prisma/client';
export declare class RefreshTokenDbService {
    private prisma;
    constructor(prisma: PrismaService);
    getToken(token: string): Promise<RefreshToken | null>;
    deleteToken(token: string): Promise<RefreshToken | null>;
    addToken(refreshToken: {
        token: string;
        email: string;
    }): Promise<RefreshToken | null>;
}
