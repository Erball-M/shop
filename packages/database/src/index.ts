import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

export class DatabaseClient extends PrismaClient {
  constructor(connectionString = process.env.DATABASE_URL) {
    if (!connectionString) {
      throw new Error("DATABASE_URL is required to create a Prisma client");
    }

    super({
      adapter: new PrismaPg({ connectionString }),
    });
  }
}

export function createPrismaClient(
  connectionString = process.env.DATABASE_URL,
) {
  return new DatabaseClient(connectionString);
}
