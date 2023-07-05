import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CryptoService } from '@utils/sha256.service'
import { UserDbService } from '@database/user.db.service'
import { user } from '@prisma/client'

import jwtConfig from '@config/jwt.config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		private readonly userDbService: UserDbService,
        private readonly jwtService: JwtService,
		private readonly cryptoService: CryptoService

	) { }
	async validateUser(email: string, password: string): Promise<user> {
		const hashedPassword = this.cryptoService.createHashSHA256(password)
		const user = await this.userDbService.getUser(
			{
				email,
				password: hashedPassword
			}
		)
		if (!user) {
			throw new UnauthorizedException('Incorrect username or password.')
		}
		return user
	}

	private async generateAuthTokenSet(email: string): Promise<AuthTokenSet> {
		const payload = { email }
		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: jwtConfig().accessTokenExpiryTime,
			secret: jwtConfig().secret,
		})

		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: jwtConfig().refreshTokenExpiryTime,
			secret: jwtConfig().secret,
		})

		return { accessToken, refreshToken }
	}

	private getPresentableUser(user: user): PresentableUser {
		return {
		  email: user.email,
		  username: user.username,
		  ...(user.image && { image: user.image }),
		  bio: user.bio,
		  firstName: user.firstName,
		  lastName: user.lastName
		}
	  }

	async processSignIn(user: user): Promise<SignInResponse> {
		const authTokenSet = await this.generateAuthTokenSet(user.email)

		if (!user.verified) {
			throw new UnauthorizedException('Prior to continuing, it\'s important that you verify your account through your email. Furthermore, we have sent you another email as a backup option in case you have misplaced or cannot locate the initial email.')
		}
		const presentableUser = this.getPresentableUser(user)

		return { authTokenSet, presentableUser }
	}

}

type SignInResponse = {
    authTokenSet: AuthTokenSet,
    presentableUser: PresentableUser
}

type AuthTokenSet =  {
    accessToken: string,
    refreshToken: string
}

type PresentableUser = {
    email: string,
    username: string,
    image?: string,
    bio: string,
    firstName: string,
    lastName: string
}