import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { RegistrationStatus } from 'src/types/registration-status';
import { LoginStatus } from 'src/types/login-status';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('/api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {}

    @Public()
    @Post('register')
    async register(@Body() userDto: RegisterDto): Promise<RegistrationStatus> {
        const res = await this.authService.register(userDto);
        if (!res.success) {
            throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
        }

        return res;
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() userDto: LoginDto): Promise<LoginStatus> {
        return await this.authService.login(userDto);
    }

    // refresh token

    @UseGuards(JwtRefreshTokenGuard)
    @Post('refresh-token')
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshAccessToken(refreshTokenDto.refresh_token);
    }

}
