import type { ConfigModuleOptions } from "@nestjs/config";
import Joi from "joi";
import { resolve } from "node:path";

export const configModuleOptions: ConfigModuleOptions = {
  cache: true,
  envFilePath: resolve(process.cwd(), ".env"),
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
    API_GATEWAY_CORS_ORIGIN: Joi.string()
      .default("http://localhost:3000")
      .custom((origins: string, helpers) => {
        const invalidOrigin = origins
          .split(",")
          .map((origin) => origin.trim())
          .find((origin) => {
            try {
              const url = new URL(origin);
              return (
                !["http:", "https:"].includes(url.protocol) ||
                url.origin !== origin
              );
            } catch {
              return true;
            }
          });

        return invalidOrigin
          ? helpers.error("string.uri", { value: invalidOrigin })
          : origins;
      }),
    API_GATEWAY_PORT: Joi.number().port().default(3001),
  })
    .unknown(true)
    .validate(config, { convert: true });

  if (error) {
    throw new Error(`Invalid environment configuration: ${error.message}`);
  }

  return value;
}
