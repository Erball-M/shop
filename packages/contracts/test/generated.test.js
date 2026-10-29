import assert from "node:assert/strict";
import test from "node:test";

import {
  AUTH_SERVICE_NAME,
  AUTH_V1_PACKAGE_NAME,
  AuthServiceControllerMethods,
  OtpIdentifierType,
} from "../dist/src/index.js";

test("exports the NestJS auth contract", () => {
  assert.equal(AUTH_SERVICE_NAME, "AuthService");
  assert.equal(AUTH_V1_PACKAGE_NAME, "auth.v1");
  assert.equal(OtpIdentifierType.OTP_IDENTIFIER_TYPE_EMAIL, 1);
  assert.equal(typeof AuthServiceControllerMethods, "function");
});
