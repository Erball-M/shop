import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../../../prisma/generated/client.js";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(configService: ConfigService) {
    super({
      adapter: new PrismaPg({
        connectionString: configService.getOrThrow<string>("AUTH_DATABASE_URL"),
      }),
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log("Connected to the auth database");
    } catch (error) {
      this.logger.error(
        "Failed to connect to the auth database",
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log("Disconnected from the auth database");
    } catch (error) {
      this.logger.error(
        "Failed to disconnect from the auth database",
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }
  }
}
