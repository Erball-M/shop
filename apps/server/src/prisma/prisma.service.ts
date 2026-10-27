import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { DatabaseClient } from "@repo/database";

@Injectable()
export class PrismaService
  extends DatabaseClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
