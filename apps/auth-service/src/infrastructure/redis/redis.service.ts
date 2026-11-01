import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Redis } from "ioredis";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private readonly client: Redis;

  constructor(configService: ConfigService) {
    this.client = new Redis(configService.getOrThrow<string>("REDIS_URL"), {
      enableOfflineQueue: true,
      lazyConnect: true,
      maxRetriesPerRequest: 5,
    });
    this.client.on("error", (error: Error) => {
      this.logger.error("Redis client error", error.stack);
    });
  }

  async onModuleInit() {
    const startedAt = Date.now();

    try {
      await this.client.connect();
      this.logger.log(`Connected to Redis in ${Date.now() - startedAt}ms`);
    } catch (error) {
      this.logger.error(
        `Failed to connect to Redis after ${Date.now() - startedAt}ms`,
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }
  }

  async onModuleDestroy() {
    const startedAt = Date.now();

    try {
      await this.client.quit();
      this.logger.log(`Disconnected from Redis in ${Date.now() - startedAt}ms`);
    } catch (error) {
      this.logger.error(
        `Failed to disconnect from Redis after ${Date.now() - startedAt}ms`,
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }
  }

  getClient(): Redis {
    return this.client;
  }
}
