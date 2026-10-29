const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const packageDirectory = path.resolve(__dirname, "..");
const protoDirectory = path.join(packageDirectory, "proto");
const generatedDirectory = path.join(packageDirectory, "generated");
const repositoryNodeModules = path.resolve(
  packageDirectory,
  "..",
  "..",
  "node_modules",
);
const protoc = require.resolve("protoc/protoc.cjs");
const pluginName =
  process.platform === "win32"
    ? "protoc-gen-ts_proto.cmd"
    : "protoc-gen-ts_proto";
const plugin = path.join(repositoryNodeModules, ".bin", pluginName);

if (!fs.existsSync(protoDirectory)) {
  throw new Error(`Proto directory not found at ${protoDirectory}`);
}

if (!fs.existsSync(plugin)) {
  throw new Error(`ts-proto plugin not found at ${plugin}`);
}

const protoFiles = fs
  .readdirSync(protoDirectory, { recursive: true })
  .filter((file) => file.endsWith(".proto"))
  .map((file) => file.split(path.sep).join("/"))
  .sort();

if (protoFiles.length === 0) {
  throw new Error(`No .proto files found in ${protoDirectory}`);
}

fs.rmSync(generatedDirectory, { recursive: true, force: true });
fs.mkdirSync(generatedDirectory, { recursive: true });

const relativePlugin = path.relative(packageDirectory, plugin);
const result = spawnSync(
  process.execPath,
  [
    protoc,
    "--proto_path=./proto",
    `--plugin=protoc-gen-ts_proto=${relativePlugin}`,
    "--ts_proto_out=./generated",
    "--ts_proto_opt=paths=source_relative,nestJs=true,package=omit",
    ...protoFiles,
  ],
  {
    cwd: packageDirectory,
    stdio: "inherit",
  },
);

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
