import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { setupSwagger } from './shared/utils/setup-swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ClassSerializerInterceptor, Logger, ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  const PORT = configService.get('PORT') || 3000;

  const API_URL = configService.get('API_URL');

  app.enableCors();

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 400,
      forbidUnknownValues: true,
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  setupSwagger(app, API_URL);

  await app.listen(PORT);

  logger.log(`server is runnig in port: ${PORT}`);
}
bootstrap();
