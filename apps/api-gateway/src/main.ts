import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./core/app.module.js";
import { configureCors } from "./core/config/cors.config.js";
import { configureSwagger } from "./core/config/swagger.config.js";
import { createValidationPipe } from "./core/config/validation.pipe.js";

const logger = new Logger("ApiGateway");

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>("API_GATEWAY_PORT");
  const nodeEnv = configService.getOrThrow<string>("NODE_ENV");
  const corsOrigin = configService.getOrThrow<string>(
    "API_GATEWAY_CORS_ORIGIN",
  );

  app.useGlobalPipes(createValidationPipe());
  configureCors(app, corsOrigin);
  app.enableShutdownHooks();

  if (nodeEnv !== "production") {
    configureSwagger(app);
  }

  await app.listen(port);
  const host = await app.getUrl();
  logger.log(`API gateway listening at ${host}`);
  if (nodeEnv !== "production") {
    logger.log(`Swagger documentation available at ${host}/docs`);
  }
}

await bootstrap().catch((error: unknown) => {
  logger.error(
    "API gateway failed to start",
    error instanceof Error ? error.stack : String(error),
  );
  process.exitCode = 1;
});
