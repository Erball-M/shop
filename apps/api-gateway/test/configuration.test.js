import assert from "node:assert/strict";
import test from "node:test";

import { validateConfiguration } from "../dist/core/config/configuration.js";

test("applies safe configuration defaults", () => {
  const config = validateConfiguration({});

  assert.equal(config.NODE_ENV, "development");
  assert.equal(config.API_GATEWAY_PORT, 3001);
  assert.equal(config.API_GATEWAY_CORS_ORIGIN, "http://localhost:3000");
});

test("rejects wildcard CORS origins", () => {
  assert.throws(
    () => validateConfiguration({ API_GATEWAY_CORS_ORIGIN: "*" }),
    /Invalid environment configuration/,
  );
});
