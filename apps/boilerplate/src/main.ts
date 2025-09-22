import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Set global prefix
  app.setGlobalPrefix('api');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NX Monorepo API')
    .setDescription('API documentation for NX Monorepo with NestJS')
    .setVersion('1.0')
    .addTag('App')
    .addTag('Health')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  // eslint-disable-next-line no-console
  console.log('Application is running on: http://localhost:3000');
  // eslint-disable-next-line no-console
  console.log('Swagger documentation: http://localhost:3000/api/docs');
}
bootstrap();
