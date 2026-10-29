import { NestFactory } from "@nestjs/core";
import { type MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AUTH_V1_PACKAGE_NAME, protobufFileName } from "@repo/contracts";
import { config } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { AppModule } from "./app.module.js";

config({
  path: resolve(dirname(fileURLToPath(import.meta.url)), "../../../.env"),
});

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: AUTH_V1_PACKAGE_NAME,
        protoPath: resolve(
          dirname(fileURLToPath(import.meta.url)),
          "../../../packages/contracts/proto",
          protobufFileName,
        ),
        url: process.env.AUTH_GRPC_URL ?? "0.0.0.0:50051",
        loader: {
          keepCase: false,
          longs: String,
          enums: Number,
          defaults: true,
          oneofs: true,
        },
      },
    },
  );

  await app.listen();
}

void bootstrap();
