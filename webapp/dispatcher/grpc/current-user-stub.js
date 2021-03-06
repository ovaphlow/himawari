const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const gRPC = require('../config/gRPC');

const packageDefinition = protoLoader.loadSync(`${__dirname}/../proto/current-user.proto`, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition).misc;
const grpcClient = new proto.CurrentUser(
  `${gRPC.miscService.host}:${gRPC.miscService.port}`,
  grpc.credentials.createInsecure(),
);

module.exports = grpcClient;
