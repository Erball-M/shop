import { ValidationPipe, type ValidationPipeOptions } from "@nestjs/common";

const validationPipeOptions: ValidationPipeOptions = {
  forbidNonWhitelisted: true,
  transform: true,
  whitelist: true,
};

export function createValidationPipe(): ValidationPipe {
  return new ValidationPipe(validationPipeOptions);
}
