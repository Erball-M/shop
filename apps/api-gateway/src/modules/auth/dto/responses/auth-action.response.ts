import { ApiProperty } from "@nestjs/swagger";

export class AuthActionResponse {
  @ApiProperty({
    description: "Indicates that the stub accepted the request.",
    example: true,
  })
  ok!: true;
}
