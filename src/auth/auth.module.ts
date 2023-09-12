import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
import { RefreshTokenStorage } from './refresh-token-storage';
import { ConfigModule } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_TOKEN__EXPIRES_IN,
      },
    }),
  ],
  providers: [
    AuthService, 
    UserService,
    LocalStrategy, 
    JwtStrategy, 
    JwtRefreshTokenStrategy,
    RefreshTokenStorage,
  ],
  controllers: [AuthController],
  exports: [
    AuthService, 
    //LocalStrategy, 
    //JwtStrategy,
  ],
})
export class AuthModule {}
