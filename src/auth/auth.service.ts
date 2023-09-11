import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from 'src/types/payload';
import { RegistrationStatus } from 'src/types/registration-status';
import { LoginStatus } from 'src/types/login-status';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async register(userDto: RegisterDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'user registered',
        };

        try {
            await this.userService.create(userDto);
        } catch (err) {
            status = {
                success: false,
                message: err
            }
        }
        
        return status;
    }

    async login(userDto: LoginDto): Promise<LoginStatus> {
        const user = await this.userService.findByLogin(userDto);
        const signedToken = await this.signPayload(user);

        let status: LoginStatus = {
            username: user.username,
            token: signedToken
        }

        return status;
    }

    async signPayload(payload: JwtPayload) {
        const { username } = payload;
        const expiresIn = process.env.JWT_EXPIRESIN;
        const payload1 = {username: username};
        const token = this.jwtService.sign(payload1);
        return {
            expiresIn,
            token,
        }
      }

}
