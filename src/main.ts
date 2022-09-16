/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidateInputPipe} from './core/pipes/validate.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`${process.env.NODE_ENV}`);
  //global prefix
  app.setGlobalPrefix('api/v1');
 // app.enableCors();
   // handle all user input validation globally
 // app.useGlobalPipes(new ValidateInputPipe());

  await app.listen(3000);
}
bootstrap();
