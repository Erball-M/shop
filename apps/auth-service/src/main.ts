import { NestFactory } from "@nestjs/core";
import {
  AUTH_V1_PACKAGE_NAME,
  createGrpcOptions,
  protobufFileName,
} from "@repo/contracts";
import { config } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { AppModule } from "./app.module.js";

config({
  path: resolve(dirname(fileURLToPath(import.meta.url)), "../../../.env"),
});

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    createGrpcOptions({
      packageName: AUTH_V1_PACKAGE_NAME,
      protoPath: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "../../../packages/contracts/proto",
        protobufFileName,
      ),
      url: process.env.AUTH_GRPC_URL ?? "0.0.0.0:50051",
    }),
  );

  await app.listen();
}

void bootstrap();
