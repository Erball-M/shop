import { Controller } from "@nestjs/common";
import {
  type AuthServiceController,
  AuthServiceControllerMethods,
  type SendOtpRequest,
  type SendOtpResponse,
  type VerifyOtpRequest,
  type VerifyOtpResponse,
} from "@repo/contracts";

import { AuthService } from "./auth.service.js";

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  sendOtp(request: SendOtpRequest): Promise<SendOtpResponse> {
    return this.authService.sendOtp(request);
  }

  verifyOtp(request: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    return this.authService.verifyOtp(request);
  }
}
