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
        this.logger.warn('init');
    }

    async validate(payload: JwtPayload): Promise<any> {
        this.logger.warn(`Payload: ${JSON.stringify(payload)}`);
        //const user = await this.userService.findOne(payload.username); //TODO: username wont be unique
        const username = payload.username;
        const user = await this.userModel.findOne({ username: username });  //TODO: This is temporary. userService is undefined. fix and use userService

        if (!user) {
            this.logger.error('user not found');
            throw new UnauthorizedException();
        }
        return user;
    }
}