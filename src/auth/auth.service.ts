import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from 'src/types/payload';
import { RegistrationStatus } from 'src/types/registration-status';
import { LoginStatus } from 'src/types/login-status';
import * as bcrypt from 'bcrypt';

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
        const signedToken = await this.signPayload(userDto);

        let status: LoginStatus = {
            username: userDto.username,
            token: signedToken
        }

        return status;
    }

    async signPayload(payload: JwtPayload) {
        const { username } = payload;
        const expiresIn = process.env.JWT_EXPIRESIN;
        const token = this.jwtService.sign({username: username});
        return {
            expiresIn,
            token,
        }
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if ( user && isPasswordValid ) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }


}
