import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { LocalAuthGuard } from '@routes/auth/guards/local.guard'
import { AuthService } from '@routes/auth/auth.service'
import { PresentableUser, SignInResponse, SignUpRequest } from '@apptypes/auth.type'
import { UserDecorator } from '@decorators/user.decorator'
import { User } from '@prisma/client'

@Controller('api/auth')
export class AuthController {
	constructor(
        private readonly authService: AuthService,
	) { }

    @UseGuards(LocalAuthGuard)
    @Post('sign-in')
	async handleSignIn(@UserDecorator() user: User): Promise<SignInResponse> {
		return await this.authService.processSignIn(user)
	}

	@Post('sign-up')
    async handleSignUp(@Body() body: SignUpRequest): Promise<PresentableUser> {
    	return await this.authService.processSignUp(body)
    }

}