import type { ConfigModuleOptions } from "@nestjs/config";
import Joi from "joi";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const configModuleOptions: ConfigModuleOptions = {
  cache: true,
  envFilePath: resolve(
    dirname(fileURLToPath(import.meta.url)),
    "../../../../.env",
  ),
  isGlobal: true,
  validate: validateConfiguration,
};

export function validateConfiguration(
  config: Record<string, unknown>,
): Record<string, unknown> {
  const { error, value } = Joi.object({
    NODE_ENV: Joi.string()
      .valid("development", "test", "production")
      .default("development"),
    AUTH_DATABASE_URL: Joi.string().required(),
    AUTH_GRPC_URL: Joi.string().default("0.0.0.0:50051"),
  })
    .unknown(true)
    .validate(config, { convert: true });

  if (error) {
    throw new Error(`Invalid auth service configuration: ${error.message}`);
  }

  return value;
}
