import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { MyLogger } from 'utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
