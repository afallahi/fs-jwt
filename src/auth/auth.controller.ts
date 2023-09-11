import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { RegistrationStatus } from 'src/types/registration-status';
import { LoginStatus } from 'src/types/login-status';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('/api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService) {}

    @Post('register')
    async register(@Body() userDto: RegisterDto): Promise<RegistrationStatus> {
        const res = await this.authService.register(userDto);
        if (!res.success) {
            throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
        }

        return res;
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() userDto: LoginDto): Promise<LoginStatus> {
        return await this.authService.login(userDto);
    }
}
