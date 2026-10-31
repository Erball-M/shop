import assert from "node:assert/strict";

export async function assertPrismaLifecycle({
  createHarness,
  connectMessage,
  connectErrorMessage,
  disconnectMessage,
  disconnectErrorMessage,
}) {
  const connectMessages = [];
  const connectErrors = [];
  const connectHarness = createHarness();

  connectHarness.setLogger({
    log: (message) => connectMessages.push(message),
    error: (...args) => connectErrors.push(args),
  });
  connectHarness.setConnect(async () => {});

  await connectHarness.initialize();

  assert.deepEqual(connectMessages, [connectMessage]);
  assert.deepEqual(connectErrors, []);

  const connectionError = new Error("connection failed");
  const failedConnectMessages = [];
  const failedConnectErrors = [];
  const failedConnectHarness = createHarness();

  failedConnectHarness.setLogger({
    log: (message) => failedConnectMessages.push(message),
    error: (...args) => failedConnectErrors.push(args),
  });
  failedConnectHarness.setConnect(async () => {
    throw connectionError;
  });

  await assert.rejects(
    () => failedConnectHarness.initialize(),
    connectionError,
  );

  assert.deepEqual(failedConnectMessages, []);
  assert.equal(failedConnectErrors[0][0], connectErrorMessage);
  assert.equal(failedConnectErrors[0][1], connectionError.stack);

  const disconnectMessages = [];
  const disconnectErrors = [];
  const disconnectHarness = createHarness();

  disconnectHarness.setLogger({
    log: (message) => disconnectMessages.push(message),
    error: (...args) => disconnectErrors.push(args),
  });
  disconnectHarness.setDisconnect(async () => {});

  await disconnectHarness.destroy();

  assert.deepEqual(disconnectMessages, [disconnectMessage]);
  assert.deepEqual(disconnectErrors, []);

  const disconnectionError = new Error("disconnection failed");
  const failedDisconnectMessages = [];
  const failedDisconnectErrors = [];
  const failedDisconnectHarness = createHarness();

  failedDisconnectHarness.setLogger({
    log: (message) => failedDisconnectMessages.push(message),
    error: (...args) => failedDisconnectErrors.push(args),
  });
  failedDisconnectHarness.setDisconnect(async () => {
    throw disconnectionError;
  });

  await assert.rejects(
    () => failedDisconnectHarness.destroy(),
    disconnectionError,
  );

  assert.deepEqual(failedDisconnectMessages, []);
  assert.equal(failedDisconnectErrors[0][0], disconnectErrorMessage);
  assert.equal(failedDisconnectErrors[0][1], disconnectionError.stack);
}
