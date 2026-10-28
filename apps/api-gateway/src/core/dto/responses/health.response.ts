import { ApiProperty } from "@nestjs/swagger";

export class HealthResponse {
  @ApiProperty({
    description: "Current gateway health status.",
    example: "ok",
  })
  status!: string;

  @ApiProperty({
    description: "Time when the health response was generated.",
    example: "2026-10-28T01:00:00.000Z",
    format: "date-time",
  })
  timestamp!: string;
}
