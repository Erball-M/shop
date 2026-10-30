import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AUTH_V1_PACKAGE_NAME, protobufFileName } from "@repo/contracts";
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
          transport: Transport.GRPC,
          options: {
            package: AUTH_V1_PACKAGE_NAME,
            protoPath: resolve(
              dirname(fileURLToPath(import.meta.url)),
              "../../../../../packages/contracts/proto",
              protobufFileName,
            ),
            url: configService.getOrThrow<string>("AUTH_GRPC_URL"),
            loader: {
              keepCase: false,
              longs: String,
              enums: Number,
              defaults: true,
              oneofs: true,
            },
          },
        }),
      },
    ]),
  ],
})
export class AuthModule {}
