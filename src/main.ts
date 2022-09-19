/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidateInputPipe} from './core/pipes/validate.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //global prefix
app.setGlobalPrefix('api/v1');
 app.enableCors();
   // handle all user input validation globally
  app.useGlobalPipes(new ValidateInputPipe());
  console.log(process.env.NODE_ENV)

  await app.listen(3000);
}
bootstrap();
