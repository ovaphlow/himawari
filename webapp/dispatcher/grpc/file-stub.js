const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const gRPC = require('../config/gRPC');

const packageDefinition = protoLoader.loadSync(`${__dirname}/../proto/file.proto`, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition).utility;
const grpcClient = new proto.File(
  `${gRPC.utilityService.host}:${gRPC.utilityService.port}`,
  grpc.credentials.createInsecure(),
);

module.exports = grpcClient;
