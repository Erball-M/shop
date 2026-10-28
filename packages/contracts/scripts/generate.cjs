const { spawnSync } = require("node:child_process");
const path = require("node:path");

const packageDirectory = path.resolve(__dirname, "..");
const repositoryNodeModules = path.join("..", "..", "node_modules");
const protoc = require.resolve("protoc/protoc.cjs");
const pluginName =
  process.platform === "win32"
    ? "protoc-gen-ts_proto.cmd"
    : "protoc-gen-ts_proto";
const plugin = path.join(repositoryNodeModules, ".bin", pluginName);
const argumentsList = [
  "--proto_path=./proto",
  `--plugin=protoc-gen-ts_proto=${plugin}`,
  "--ts_proto_out=./generated",
  "--ts_proto_opt=paths=source_relative,nestJs=true,package=omit",
  "auth.proto",
];
const result = spawnSync(process.execPath, [protoc, ...argumentsList], {
  cwd: packageDirectory,
  stdio: "inherit",
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
