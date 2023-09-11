import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './jwt.strategy';
dotenv.config();

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRESIN,
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
