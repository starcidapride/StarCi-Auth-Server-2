import { PrismaService } from '@database/prisma.service'
import { Injectable } from '@nestjs/common'
import { user } from '@prisma/client'

@Injectable()
export class UserDbService {
	constructor(private readonly prismaService: PrismaService) { }

	async getUser(
		user?: Partial<{
            email: string,
            password: string,
            username: string,
            firstName: string,
            lastName: string,
            picture: Buffer,
            isVerified: number
        }>
	): Promise<user | null> {
		try {

			return await this.prismaService.user.findFirstOrThrow({
				where: {
					...(user?.email && { password: user.email}),
					...(user?.password && { password: user.password }),
					...(user?.username && { username: user.username }),
					...(user?.firstName && { firstName: user.firstName }),
					...(user?.lastName && { lastName: user.lastName }),
					...(user?.picture && { picture: user.picture }),
					...(user?.isVerified && { isVerified: user.isVerified }),
				}
			})
		} catch (ex) {
			return null
		}
	}

	async createUser(user: user): Promise<user | null> {
		try {
			return this.prismaService.user.create({
				data: user
			})
		}
		catch (ex) {
			return null
		}
	}

	async updateUser(
		user: {
			email: string
            password?: string
            username?: string
            firstName?: string
            lastName?: string
            picture?: Buffer
            isVerified?: number
        }
	): Promise<user | null> {
		try {
			return this.prismaService.user.update(
				{
					where: { email : user.email },
					data : user
				}
			)
		} catch (ex) {
			return null
		}
	}
}