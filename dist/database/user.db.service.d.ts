/// <reference types="node" />
import { CreateUserErrors } from '@apptypes/auth.type';
import { PrismaService } from '@database/prisma.service';
import { User } from '@prisma/client';
export declare class UserDbService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getUser(data?: Partial<{
        email: string;
        password: string;
        bio: string;
        username: string;
        firstName: string;
        lastName: string;
        picture: Buffer;
        verified: number;
    }>): Promise<User | null>;
    createUser(data: {
        email: string;
        password: string;
        bio?: string;
        username: string;
        firstName: string;
        lastName: string;
        image?: string;
        verified: boolean;
    }): Promise<{
        createResult: true;
        user: User;
    } | {
        createResult: false;
        errors: CreateUserErrors;
    }>;
    updateUser(email: string, data: Partial<{
        password: string;
        username: string;
        bio: string;
        firstName: string;
        lastName: string;
        image: string;
        verified: boolean;
    }>): Promise<User | null>;
}
