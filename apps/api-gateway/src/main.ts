import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./core/app.module.js";

const logger = new Logger("ApiGateway");

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>("API_GATEWAY_PORT");
  const corsOrigin = configService.getOrThrow<string>(
    "API_GATEWAY_CORS_ORIGIN",
  );
  const trustedOrigins = corsOrigin.split(",").map((origin) => origin.trim());

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors({
    credentials: true,
    origin: trustedOrigins,
  });
  app.enableShutdownHooks();

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Shop API Gateway")
    .setDescription("API gateway for the Shop microservices")
    .setVersion("1.0")
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, swaggerDocument);

  await app.listen(port);
  const host = `http://localhost:${port}`;
  logger.log(`API gateway listening at ${host}`);
  logger.log(`Swagger documentation available at ${host}/docs`);
}

await bootstrap().catch((error: unknown) => {
  logger.error(
    "API gateway failed to start",
    error instanceof Error ? error.stack : String(error),
  );
  process.exitCode = 1;
});
