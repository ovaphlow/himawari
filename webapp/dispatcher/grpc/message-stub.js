const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const gRPC = require('../config/gRPC');

const packageDefinition = protoLoader.loadSync(`${__dirname}/../proto/message.proto`, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition).misc;
const grpcClient = new proto.Message(
  `${gRPC.miscService.host}:${gRPC.miscService.port}`,
  grpc.credentials.createInsecure(),
);

module.exports = grpcClient;
