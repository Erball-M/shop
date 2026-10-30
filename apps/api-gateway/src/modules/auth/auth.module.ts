import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import {
  AUTH_V1_PACKAGE_NAME,
  createGrpcOptions,
  protobufFileName,
} from "@repo/contracts";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { AuthController } from "./auth.controller.js";
import { AuthGrpc } from "./auth.grpc.js";

export const AUTH_PACKAGE = "AUTH_PACKAGE";

@Module({
  controllers: [AuthController],
  providers: [AuthGrpc],
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_PACKAGE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          ...createGrpcOptions({
            packageName: AUTH_V1_PACKAGE_NAME,
            protoPath: resolve(
              dirname(fileURLToPath(import.meta.url)),
              "../../../../../packages/contracts/proto",
              protobufFileName,
            ),
            url: configService.getOrThrow<string>("AUTH_GRPC_URL"),
          }),
        }),
      },
    ]),
  ],
})
export class AuthModule {}
