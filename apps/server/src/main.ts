import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import Joi from 'joi';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AppModule } from './app.module.js';

config({
  path: resolve(dirname(fileURLToPath(import.meta.url)), '../../../.env'),
});

async function bootstrap() {
  const { error, value } = Joi.object({
    PORT: Joi.number().port().default(3000),
    CORS_ORIGIN: Joi.string().default('*'),
  }).unknown(true).validate(process.env, { convert: true });

  if (error) {
    throw new Error(`Invalid environment configuration: ${error.message}`);
  }

  Object.assign(process.env, value);
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT);
  const corsOrigin = process.env.CORS_ORIGIN ?? '*';

  app.enableCors({
    origin: corsOrigin === '*' ? true : corsOrigin.split(',').map((origin) => origin.trim()),
  });
  app.setGlobalPrefix('api');
  app.enableShutdownHooks();

  await app.listen(port);
}
await bootstrap();
