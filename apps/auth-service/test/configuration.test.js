import assert from "node:assert/strict";
import test from "node:test";

import { validateConfiguration } from "../dist/src/config/configuration.js";

const authDatabaseUrl =
  "postgresql://postgres:postgres@localhost:5432/shop_auth";

test("accepts the auth database configuration", () => {
  const config = validateConfiguration({
    AUTH_DATABASE_URL: authDatabaseUrl,
  });

  assert.equal(config.AUTH_DATABASE_URL, authDatabaseUrl);
  assert.equal(config.NODE_ENV, "development");
  assert.equal(config.AUTH_GRPC_URL, "0.0.0.0:50051");
});

test("rejects a missing auth database URL", () => {
  assert.throws(
    () => validateConfiguration({}),
    /Invalid auth service configuration/,
  );
});
