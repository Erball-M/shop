import {
  isEmail,
  isMobilePhone,
  type ValidationArguments,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from "class-validator";

import type { OtpIdentifierType } from "../dto/requests/send-otp.request.js";

@ValidatorConstraint({ name: "identifierValidator", async: false })
export class IdentifierValidator implements ValidatorConstraintInterface {
  validate(identifier: unknown, args: ValidationArguments): boolean {
    const type = (args.object as { type?: unknown }).type;

    if (type === "email") {
      return isEmail(identifier);
    }

    if (type === "phone") {
      return isMobilePhone(identifier);
    }

    return false;
  }

  defaultMessage(args: ValidationArguments): string {
    const type = (args.object as { type?: OtpIdentifierType }).type;
    return type === "email"
      ? "identifier must be a valid email address"
      : "identifier must be a valid phone number";
  }
}
