import { Body, Controller, HttpException, HttpStatus, Post, UseGuards, Headers, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { RegistrationStatus } from 'src/types/registration-status';
import { LoginStatus } from 'src/types/login-status';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('/api/v1/auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService, private userService: UserService) {}

    @Public()
    @Post('register')
    async register(@Body() userDto: RegisterDto) {
        //const res = await this.authService.register(userDto);
        return await this.authService.register(userDto);
        // if (!res.success) {
        //     throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
        // }

        // return res;
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

    @UseGuards(JwtAuthGuard)
    @Post('invalidate-token')
    async invalidateToken(@Headers('authorization') authorization: string) {
        const access_token = authorization.split(' ')[1];
        await this.authService.invalidateToken(access_token);
        return {message: 'Token invalidated.'}
    }

}
