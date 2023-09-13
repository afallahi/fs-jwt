import { Logger, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "src/types/payload";
import { User, UserDocument } from "src/user/schemas/user.schema";
import { UserService } from "src/user/user.service";
import { Model } from 'mongoose';

export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);
    
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY
        })
    }

    async validate(payload: JwtPayload): Promise<any> {
        const user = await this.userService.findOne(payload.sub);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}