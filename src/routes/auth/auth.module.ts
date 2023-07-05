import { Module } from '@nestjs/common'
import { AuthService } from '@routes/auth/auth.service'
import { AuthController } from '@routes/auth/auth.controller'
import { LocalStrategy } from '@routes/auth/strategies/local.strategy'
import { UserDbService } from '@database/user.db.service'
import { PrismaService } from '@database/prisma.service'
import { JwtStrategy } from '@routes/auth/strategies/jwt.strategy'
import { JwtService } from '@nestjs/jwt'
import { CryptoService } from '@utils/sha256.service'
import { RefreshTokenDbService } from '@database/refresh-token.db.service'
import { MailerService } from './mailer/mailer.service'

@Module({
	imports: [],
	providers: [
		AuthService, 
		LocalStrategy,
		JwtStrategy,
		UserDbService,
		PrismaService,
		JwtService,
		RefreshTokenDbService,
		CryptoService,
		MailerService
	],
	controllers: [AuthController]
})
export class AuthModule {}