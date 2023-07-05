import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import jwtConfig from '@config/jwt.config'
import { UserDbService } from '@database/user.db.service'
import { Payload } from '@apptypes/auth.type'
import { User } from '@prisma/client'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userDbService: UserDbService) {
		super(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				ignoreExpiration: false,
				secretOrKey: jwtConfig().secret
			}
		)
	}

	async validate(payload: Payload): Promise<User> {
		return await this.userDbService.getUser({ email : payload.email })
	}
}