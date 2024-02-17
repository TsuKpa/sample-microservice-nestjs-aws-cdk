import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const host = configService.get<string>('HOST') || 'localhost';
  const port = configService.get<number>('PORT') || 3000;
  Logger.log(`API Router is running on http://${host}:${port}`);

  const config = new DocumentBuilder()
    .setTitle('Microservice example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('microservices')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
