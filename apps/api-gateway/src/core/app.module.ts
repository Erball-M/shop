import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { configModuleOptions } from "./config/configuration.js";

@Module({
  controllers: [AppController],
  imports: [ConfigModule.forRoot(configModuleOptions)],
  providers: [AppService],
})
export class AppModule {}
