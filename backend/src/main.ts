import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Вмикаємо охоронця, який буде перевіряти всі вхідні дані
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Відкидає всі зайві поля, яких немає в наших правилах
  }));

  await app.listen(3000);
}
bootstrap();