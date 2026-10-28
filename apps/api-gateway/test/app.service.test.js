import assert from "node:assert/strict";
import test from "node:test";

import { AppService } from "../dist/core/app.service.js";

test("returns a healthy status and ISO timestamp", () => {
  const response = new AppService().getHealth();

  assert.equal(response.status, "ok");
  assert.match(response.timestamp, /^\d{4}-\d{2}-\d{2}T.*Z$/);
});
