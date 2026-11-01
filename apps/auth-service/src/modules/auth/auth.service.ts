import { Injectable } from "@nestjs/common";
import {
  OtpIdentifierType,
  type SendOtpRequest,
  type SendOtpResponse,
  type VerifyOtpRequest,
  type VerifyOtpResponse,
} from "@repo/contracts";

import type { User } from "../../../prisma/generated/client.js";

import { AuthRepository, type CreateUserData } from "./auth.repository.js";

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  create(data: CreateUserData): Promise<User> {
    return this.authRepository.create(data);
  }

  async sendOtp(request: SendOtpRequest): Promise<SendOtpResponse> {
    if (!request.identifier) {
      return { ok: false };
    }

    switch (request.type) {
      case OtpIdentifierType.OTP_IDENTIFIER_TYPE_PHONE:
        if (!(await this.authRepository.findByPhone(request.identifier))) {
          await this.authRepository.create({ phone: request.identifier });
        }
        break;
      case OtpIdentifierType.OTP_IDENTIFIER_TYPE_EMAIL:
        if (!(await this.authRepository.findByEmail(request.identifier))) {
          await this.authRepository.create({ email: request.identifier });
        }
        break;
      default:
        return { ok: false };
    }

    return { ok: true };
  }

  async verifyOtp(request: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    void request;
    return { ok: true };
  }
}
