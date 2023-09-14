import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './swagger/swagger';

const PORT = 3002;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  SwaggerModule.setup('api', app, createDocument(app));
  await app.listen(PORT);
}
bootstrap();
