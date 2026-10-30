import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString, Validate } from "class-validator";

import { IdentifierValidator } from "../../validators/identifier.validator.js";

import type { OtpIdentifierType } from "./send-otp.request.js";

export class VerifyOtpRequest {
  @ApiProperty({
    description: "Email address or phone number associated with the OTP.",
    example: "+14155552671",
  })
  @IsString()
  @Validate(IdentifierValidator)
  identifier!: string;

  @ApiProperty({
    description: "Channel used to deliver the OTP.",
    enum: ["email", "phone"],
    example: "phone",
  })
  @IsIn(["email", "phone"])
  type!: OtpIdentifierType;

  @ApiProperty({
    description: "One-time password to verify.",
    example: "123456",
  })
  @IsString()
  code!: string;
}
