import cryptoConfig from '@config/crypto.config'
import jwtConfig from '@config/jwt.config'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@routes/auth/auth.module'

@Module({
	imports: 
  [
  	ConfigModule.forRoot({
  			load: [
  			cryptoConfig,
  			jwtConfig
  		]}),
  	AuthModule
  ],
	controllers: [],
	providers: [],
})
export class AppModule {}

