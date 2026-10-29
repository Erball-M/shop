import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { SendOtpRequest } from "./dto/requests/send-otp.request.js";
import { AuthActionResponse } from "./dto/responses/auth-action.response.js";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  @Post("otp/send")
  @ApiOperation({
    summary: "Request a one-time password",
    description:
      "Stub endpoint for requesting an OTP for an email address or phone number.",
  })
  @ApiBody({ type: SendOtpRequest })
  @ApiOkResponse({
    description: "The OTP request was accepted by the stub.",
    type: AuthActionResponse,
  })
  sendOtp(@Body() dto: SendOtpRequest): AuthActionResponse {
    console.log(dto);
    return { ok: true };
  }

  @Post("otp/verify")
  @ApiOperation({
    summary: "Verify a one-time password",
    description: "Stub endpoint for verifying an OTP.",
  })
  @ApiOkResponse({
    description: "The OTP verification was accepted by the stub.",
    type: AuthActionResponse,
  })
  verifyOtp(@Body() dto: Record<string, unknown>): AuthActionResponse {
    console.log(dto);
    return { ok: true };
  }
}
