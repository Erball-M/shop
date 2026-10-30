import { config } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function createPrismaConfig({
  configFileUrl,
  databaseUrlEnvironmentVariable,
}) {
  config({
    path: resolve(dirname(fileURLToPath(configFileUrl)), "../../.env"),
  });

  return {
    schema: "prisma/schema.prisma",
    migrations: {
      path: "prisma/migrations",
    },
    datasource: {
      url: process.env[databaseUrlEnvironmentVariable],
    },
  };
}
