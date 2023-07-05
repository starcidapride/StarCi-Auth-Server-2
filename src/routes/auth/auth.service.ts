import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { CryptoService } from '@utils/sha256.service'
import { UserDbService } from '@database/user.db.service'
import { User } from '@prisma/client'

import jwtConfig from '@config/jwt.config'
import { JwtService } from '@nestjs/jwt'
import { AuthTokenSet, PresentableUser, SignInResponse, SignUpRequest } from '@apptypes/auth.type'
import { RefreshTokenDbService } from '@database/refresh-token.db.service'

import { MailerService } from '@routes/auth/mailer/mailer.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly userDbService: UserDbService,
        private readonly jwtService: JwtService,
		private readonly refreshTokenDbService: RefreshTokenDbService,
		private readonly mailerService: MailerService,
		private readonly cryptoService: CryptoService
	) { }
	
	async validateUser(email: string, password: string): Promise<User> {
		const hashedPassword = this.cryptoService.createHashSHA256(password)
		const user = await this.userDbService.getUser(
			{
				email,
				password : hashedPassword
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
  
	async processSignIn(user: User): Promise<SignInResponse> {
		const authTokenSet = await this.generateAuthTokenSet(user.email)

		if (!user.verified) {
			throw new UnauthorizedException('Prior to continuing, it\'s important that you verify your account through your email. Furthermore, we have sent you another email as a backup option in case you have misplaced or cannot locate the initial email.')
		}
		const presentableUser : PresentableUser = {
			email: user.email,
			...(user.username && { username: user.username }),
			...(user.image && { image: user.image }),
			...(user.bio && { bio: user.bio }),
			firstName: user.firstName,
			lastName: user.lastName
		}

		return { authTokenSet, presentableUser }
	}

	async processSignUp(data: SignUpRequest): Promise<PresentableUser> {
		const { email, password, username, firstName, lastName } = data

		const hashedPassword = this.cryptoService.createHashSHA256(password)
		const user = {
			email,
			password: hashedPassword, 
			firstName, 
			lastName, 
			verified: false
		}

		const createResult = await this.userDbService.createUser(user)
		if (!createResult) {
			throw new HttpException('This email has been register before.', HttpStatus.NOT_FOUND)
		}

		await this.mailerService.sendMail(email, username)
		return {
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName
		}
	}

	// async processRefresh(refreshToken: string): Promise<AuthTokenSet> {
	// 	let payload: Payload
	// 	try{
	// 	 	payload = await this.jwtService.verifyAsync<Payload>(
	// 			refreshToken, 
	// 			{ 
	// 				secret: jwtConfig().secret 
	// 			}
	// 		)
	// 	} catch (ex){
	// 		throw new HttpException('The refresh token has either expired or is invalid.', HttpStatus.BAD_REQUEST)
	// 	}

	// 	const email = payload.email

	// 	const tokenSet = await this.generateAuthTokenSet(email)
	// 	await this.refreshTokenDbService.addToken({
	// 		token: tokenSet.refreshToken,
	// 		email
	// 	}
	// 	)
	// 	return tokenSet
	// }


}

