import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "src/types/payload";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh-token'
) {

    private readonly logger = new Logger(JwtRefreshTokenStrategy.name);

    constructor(private readonly userService: UserService, jwtService: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY
        });
        this.logger.warn('Jwt RefreshToken Strategy - init');
    }

    async validate(payload: JwtPayload): Promise<any> {
        this.logger.warn(`Payload: ${JSON.stringify(payload)}`);
        const user = await this.userService.findOne(payload.username);
        if (!user) {
            this.logger.error('User not found');
            throw new UnauthorizedException();
          }
          return user;
    }

}