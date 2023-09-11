import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/')
    getHello(): string {
      return this.userService.getHello();
    }

    @Post('/')
    postHello(): string {
      return this.userService.postHello();
    }

}
