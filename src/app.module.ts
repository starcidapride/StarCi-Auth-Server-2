import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: 
  [
  	ConfigModule.forRoot({
  			load: [

  		]})
  ],
	controllers: [],
	providers: [],
})
export class AppModule {}

