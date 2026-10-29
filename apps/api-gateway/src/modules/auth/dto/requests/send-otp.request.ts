import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString, Validate } from "class-validator";

import { IdentifierValidator } from "../../validators/identifier.validator.js";

export type OtpIdentifierType = "email" | "phone";

export class SendOtpRequest {
  @ApiProperty({
    description: "Email address or phone number that should receive the OTP.",
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
}
