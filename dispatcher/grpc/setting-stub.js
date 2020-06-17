const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const gRPC = require('../config/gRPC');

const packageDefinition = protoLoader.loadSync(`${__dirname}/../proto/setting.proto`, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition).miscdata;
const grpcClient = new proto.Setting(
  `${gRPC.miscDataService.host}:${gRPC.miscDataService.port}`,
  grpc.credentials.createInsecure(),
);

module.exports = grpcClient;
