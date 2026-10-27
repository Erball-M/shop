import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import Joi from "joi";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "../../../.env",
      ),
      isGlobal: true,
      validate: (config: Record<string, unknown>) => {
        const { error, value } = Joi.object({
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
          throw new Error(
            `Invalid environment configuration: ${error.message}`,
          );
        }

        return value;
      },
    }),
  ],
})
export class AppModule {}
