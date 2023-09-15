import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('/api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    getAllUsers() {
      return this.userService.getAllUsers();
    }

    @Get('/')
    getHello(): string {
      return this.userService.getHello();
    }

    @Post('/')
    postHello(): string {
      return this.userService.postHello();
    }

}
