import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from 'src/types/payload';
import { RegistrationStatus } from 'src/types/registration-status';
import { LoginStatus } from 'src/types/login-status';
import * as bcrypt from 'bcrypt';
import { RefreshTokenStorage } from './refresh-token-storage';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(JwtRefreshTokenStrategy.name);
    
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>, // remove?
        private readonly configService: ConfigService, //remove?
        private userService: UserService, 
        private jwtService: JwtService,
        private readonly refreshTokenStorage: RefreshTokenStorage,
        ) {}

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

        const user = await this.validateUser(
            userDto.username,
            userDto.password,
        );

        if (!user) {
            throw new UnauthorizedException('Invalid username or password');

        }
        const accessToken = await this.signPayload(userDto);
        const refreshToken = await this.jwtService.sign(userDto, {
            expiresIn: '1d'
        });

        await this.refreshTokenStorage.insert(user.username, refreshToken); // TODO: change to user.id

        let status: LoginStatus = {
            access_token: accessToken,
            refresh_token: refreshToken,
        }

        return status;
    }

    async signPayload(payload: JwtPayload) {
        const { username } = payload;
        const expiresIn = process.env.JWT_ACCESS_TOKEN__EXPIRES_IN;
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
        this.logger.error(`Error: user is null`);
        return null;
    }


    // Refresh Token

    async refreshAccessToken(refreshToken: string): Promise<{access_token: string}> {
        try {
            const decoded = await this.jwtService.verifyAsync(refreshToken);
            await this.refreshTokenStorage.validate(decoded.sub, refreshToken);
            //const payload = { sub: decoded.sub, username: decoded.username };
            const payload = { username: decoded.username };
            const accessToken = await this.jwtService.signAsync(payload);
            return { access_token: accessToken };
        } catch (error) {
            this.logger.error(`Error: ${error.message}`);
            throw new UnauthorizedException(`Invalid refresh token`);
        }
    }

}
