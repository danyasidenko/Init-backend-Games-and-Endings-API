import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true, // ЦЕЙ РЯДОК МАГІЧНИЙ: він перетворить "1" з URL на число 1
  }));

  await app.listen(3000);
}
bootstrap();