import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { RefreshToken } from '@prisma/client'

@Injectable()
export class RefreshTokenDbService {
	constructor(private prisma: PrismaService) {
	}
	async getToken(token: string): Promise<RefreshToken | null> {
		try{
			return await this.prisma.refreshToken.findUniqueOrThrow({
				where: { token }
			})
		} catch (ex){
			return null
		}
		
	}

	async deleteToken(token: string): Promise<RefreshToken | null> {
		try {
			return await this.prisma.refreshToken.delete({ where: { token } })
		} catch (ex) {
			return null
		}

	}

	async addToken(refreshToken: RefreshToken): Promise<RefreshToken | null> {

		try {
			return await this.prisma.refreshToken.create({ data: refreshToken})
		} catch (ex) {
			return null
		}
	}
}