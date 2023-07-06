import { UserDbService } from '@database/user.db.service';
import { Payload } from '@apptypes/auth.type';
import { User } from '@prisma/client';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userDbService;
    constructor(userDbService: UserDbService);
    validate(payload: Payload): Promise<User>;
}
export {};
