import { PrismaService } from '@database/prisma.service'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

@Injectable()
export class UserDbService {
	constructor(private readonly prismaService: PrismaService) { }

	async getUser(
		data?: Partial<{
			email: string,
			password: string,
			bio: string,
			username: string,
			firstName: string,
			lastName: string,
			picture: Buffer,
			verified: number
		}>
	): Promise<User | null> {
		try {

			return await this.prismaService.user.findFirstOrThrow({
				where: {
					...(data?.email && { email: data.email }),
					...(data?.password && { password: data.password }),
					...(data?.bio && { bio : data.bio}),
					...(data?.username && { username: data.username }),
					...(data?.firstName && { firstName: data.firstName }),
					...(data?.lastName && { lastName: data.lastName }),
					...(data?.picture && { picture: data.picture }),
					...(data?.verified && { isVerified: data.verified }),
				}
			})
		} catch (ex) {
			console.log(ex)
			return null
		}
	}

	async createUser(
		data: {
			email: string,
			password: string,
			bio?: string,
			username?: string,
			firstName: string,
			lastName: string,
			image?: string,
			verified: boolean
		}): Promise<User | null> {
		try {
			return await this.prismaService.user.create({
				data
			})
		}
		catch (ex) {
			return null
		}
	}

	async updateUser(
		email: string,
		data: Partial<{
			password: string
			username: string
			bio: string
			firstName: string
			lastName: string
			image: string
			verified: boolean
		}>
	): Promise<User | null> {
		try {
			return this.prismaService.user.update(
				{
					where: { email },
					data: {
						...(data?.password && { password: data.password }),
						...(data?.username && { username: data.username }),
						...(data?.bio && { bio: data.bio }),
						...(data?.firstName && { firstName: data.firstName }),
						...(data?.lastName && { lastName: data.lastName }),
						...(data?.image && { picture: data.image }),
						...(data?.verified && { verified: data.verified }),
					}
				}
			)
		} catch (ex) {
			return null
		}
	}
}