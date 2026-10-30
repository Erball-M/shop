import { ApiProperty } from "@nestjs/swagger";

export class AuthActionResponse {
  @ApiProperty({
    description: "Indicates whether the auth operation succeeded.",
    example: true,
  })
  ok!: boolean;
}
