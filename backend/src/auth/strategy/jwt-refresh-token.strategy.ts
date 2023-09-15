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
            //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY
        });
    }

    async validate(request: Request, payload: JwtPayload): Promise<any> {
        this.logger.log(`validate1`);
        this.logger.log(`validate1: ${JSON.stringify(request)}`);
        const user = await this.userService.findOne(payload.sub);
        if (!user) {
            throw new UnauthorizedException();
          }
          return user;
    }

}