import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto } from 'src/auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(userDto: RegisterDto): Promise<any> {

        const { username, password } = userDto;
        const user = await this.userModel.findOne({ username });
        if (user) {
            throw new HttpException("User already exists", HttpStatus.BAD_REQUEST)
        }

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const requestBody: RegisterDto = {
            username: username,
            password: hash
        }

        const newUser = new this.userModel(requestBody)
        await newUser.save();

        return {statusCode: HttpStatus.CREATED, message: "user created"};
    }

    async findByLogin(userDto: LoginDto): Promise<LoginDto> {

        const { username, password } = userDto;
        const user = await this.userModel.findOne({ username });

        if (!user) {
            throw new HttpException('User not found, please sign up.', HttpStatus.UNAUTHORIZED);
        }

        const isSamePassword = await bcrypt.compare(password, user.password);
        if (!isSamePassword) {
            throw new HttpException('Invalid credentials, please try again', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userModel.findOne({ id });
        return user;
    }

    async findWithUsername(username: string): Promise<User> {
        const user = await this.userModel.findOne({ username });
        return user;
    }


    getHello(): string {
        return 'Hello World!';
      }    

    postHello(): string {
        return 'Hello World!';
    }    

}
