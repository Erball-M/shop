import { assertPrismaLifecycle } from "@repo/prisma-config/testing";
import test from "node:test";

import { PrismaService } from "../dist/src/infrastructure/prisma/prisma.service.js";

const authDatabaseUrl =
  "postgresql://postgres:postgres@localhost:5432/shop_auth";

function createService() {
  return new PrismaService({
    getOrThrow: () => authDatabaseUrl,
  });
}

test("follows the Prisma lifecycle contract", async () => {
  await assertPrismaLifecycle({
    connectMessage: "Connected to the auth database",
    connectErrorMessage: "Failed to connect to the auth database",
    disconnectMessage: "Disconnected from the auth database",
    disconnectErrorMessage: "Failed to disconnect from the auth database",
    createHarness: () => {
      const service = createService();

      return {
        initialize: () => service.onModuleInit(),
        destroy: () => service.onModuleDestroy(),
        setConnect: (implementation) => {
          service.$connect = implementation;
        },
        setDisconnect: (implementation) => {
          service.$disconnect = implementation;
        },
        setLogger: (logger) => {
          service.logger = logger;
        },
      };
    },
  });
});
