import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function configureSwagger(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Shop API Gateway")
    .setDescription("API gateway for the Shop microservices")
    .setVersion("1.0")
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("docs", app, swaggerDocument);
}
