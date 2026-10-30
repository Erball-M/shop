import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { OtpIdentifierType as GrpcOtpIdentifierType } from "@repo/contracts";
import { firstValueFrom } from "rxjs";

import { AuthGrpc } from "./auth.grpc.js";
import { SendOtpRequest } from "./dto/requests/send-otp.request.js";
import { VerifyOtpRequest } from "./dto/requests/verify-otp.request.js";
import { AuthActionResponse } from "./dto/responses/auth-action.response.js";

const grpcOtpIdentifierType: Record<
  SendOtpRequest["type"],
  GrpcOtpIdentifierType
> = {
  email: GrpcOtpIdentifierType.OTP_IDENTIFIER_TYPE_EMAIL,
  phone: GrpcOtpIdentifierType.OTP_IDENTIFIER_TYPE_PHONE,
};

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authGrpc: AuthGrpc) {}

  @Post("otp/send")
  @ApiOperation({
    summary: "Request a one-time password",
    description:
      "Request an OTP for an email address or phone number through the auth service.",
  })
  @ApiBody({ type: SendOtpRequest })
  @ApiOkResponse({
    description: "The OTP request was accepted by the stub.",
    type: AuthActionResponse,
  })
  async sendOtp(@Body() dto: SendOtpRequest): Promise<AuthActionResponse> {
    return firstValueFrom(
      this.authGrpc.sendOtp({
        identifier: dto.identifier,
        type: grpcOtpIdentifierType[dto.type],
      }),
    );
  }

  @Post("otp/verify")
  @ApiOperation({
    summary: "Verify a one-time password",
    description: "Verify an OTP through the auth service.",
  })
  @ApiBody({ type: VerifyOtpRequest })
  @ApiOkResponse({
    description: "The OTP verification result.",
    type: AuthActionResponse,
  })
  async verifyOtp(@Body() dto: VerifyOtpRequest): Promise<AuthActionResponse> {
    return firstValueFrom(
      this.authGrpc.verifyOtp({
        identifier: dto.identifier,
        type: grpcOtpIdentifierType[dto.type],
        code: dto.code,
      }),
    );
  }
}
