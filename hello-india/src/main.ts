/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform the payload into the DTO class
      forbidNonWhitelisted: true, // Reject non-whitelisted fields
      whitelist: true, // Strip out non-declared properties in the payload
    }),
  );

  // await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
