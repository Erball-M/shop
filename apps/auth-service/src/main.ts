import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  AUTH_V1_PACKAGE_NAME,
  createGrpcOptions,
  protobufFileName,
} from "@repo/contracts";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    createGrpcOptions({
      packageName: AUTH_V1_PACKAGE_NAME,
      protoPath: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "../../../../packages/contracts/proto",
        protobufFileName,
      ),
      url: new ConfigService().getOrThrow<string>("AUTH_GRPC_URL"),
    }),
  );

  await app.listen();
}

void bootstrap();
