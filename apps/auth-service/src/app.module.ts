import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { configModuleOptions } from "./config/configuration.js";
import { AuthModule } from "./modules/auth/auth.module.js";

@Module({
  imports: [AuthModule, ConfigModule.forRoot(configModuleOptions)],
})
export class AppModule {}
