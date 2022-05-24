import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // TODO: CORS は最小限の範囲に絞る
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().setVersion('1.0').build(),
  );
  SwaggerModule.setup('apidoc', app, document);

  await app.listen(3000);
}
bootstrap();
