import { Injectable } from "@nestjs/common";

import { HealthResponse } from "./dto/responses/health.response.js";

@Injectable()
export class AppService {
  getHealth(): HealthResponse {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}
