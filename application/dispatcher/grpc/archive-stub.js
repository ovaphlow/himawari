const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const gRPC = require('../config/gRPC');

const packageDefinition = protoLoader.loadSync(`${__dirname}/../proto/archive.proto`, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition).biz;
const grpcClient = new proto.Archive(
  `${gRPC.bizService.host}:${gRPC.bizService.port}`,
  grpc.credentials.createInsecure(),
);

module.exports = grpcClient;
