/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as serverless from 'serverless-http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform the payload into the DTO class
      forbidNonWhitelisted: true, // Reject non-whitelisted fields
      whitelist: true, // Strip out non-declared properties in the payload
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  await app.init();
}
bootstrap();
export const handler = serverless(expressApp);
