import { type GrpcOptions, Transport } from "@nestjs/microservices";

export interface GrpcOptionsInput {
  packageName: string;
  protoPath: string;
  url: string;
}

export function createGrpcOptions({
  packageName,
  protoPath,
  url,
}: GrpcOptionsInput): GrpcOptions {
  return {
    transport: Transport.GRPC,
    options: {
      package: packageName,
      protoPath,
      url,
      loader: {
        keepCase: false,
        longs: String,
        enums: Number,
        defaults: true,
        oneofs: true,
      },
    },
  };
}
