import type { INestApplication } from "@nestjs/common";

export function configureCors(app: INestApplication, corsOrigin: string): void {
  app.enableCors({
    credentials: true,
    origin: corsOrigin.split(",").map((origin) => origin.trim()),
  });
}
