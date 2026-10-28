import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";

import { AppService } from "./app.service.js";
import { HealthResponse } from "./dto/responses/health.response.js";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("health")
  @ApiOkResponse({
    description: "Returns the current API gateway health status.",
    type: HealthResponse,
  })
  getHealth(): HealthResponse {
    return this.appService.getHealth();
  }
}
