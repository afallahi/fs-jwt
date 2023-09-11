import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRESIN,
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
