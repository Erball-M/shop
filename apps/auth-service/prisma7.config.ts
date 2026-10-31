import { createPrismaConfig } from "@repo/prisma-config";
import { defineConfig } from "prisma/config";

export default defineConfig(
  createPrismaConfig({
    configFileUrl: import.meta.url,
    databaseUrlEnvironmentVariable: "AUTH_DATABASE_URL",
  }),
);
