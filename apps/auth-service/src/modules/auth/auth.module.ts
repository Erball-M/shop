import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller.js";
import { AuthRepository } from "./auth.repository.js";
import { AuthService } from "./auth.service.js";

@Module({
  controllers: [AuthController],
  providers: [AuthRepository, AuthService],
  exports: [AuthRepository],
})
export class AuthModule {}
