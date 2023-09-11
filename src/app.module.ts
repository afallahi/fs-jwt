import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MongoDB_URL),
    UserModule, 
    PostModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
