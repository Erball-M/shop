import { Controller } from "@nestjs/common";
import {
  type AuthServiceController,
  AuthServiceControllerMethods,
  type SendOtpRequest,
  type SendOtpResponse,
  type VerifyOtpRequest,
  type VerifyOtpResponse,
} from "@repo/contracts";

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  sendOtp(request: SendOtpRequest): SendOtpResponse {
    console.log(request);
    return { ok: true };
  }

  verifyOtp(request: VerifyOtpRequest): VerifyOtpResponse {
    console.log(request);
    return { ok: true };
  }
}
