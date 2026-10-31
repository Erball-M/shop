import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { configModuleOptions } from "./config/configuration.js";
import { PrismaModule } from "./infrastructure/prisma/prisma.module.js";
import { AuthModule } from "./modules/auth/auth.module.js";

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}
