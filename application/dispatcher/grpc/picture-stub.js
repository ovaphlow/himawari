const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const gRPC = require('../config/gRPC');

const packageDefinition = protoLoader.loadSync(`${__dirname}/../proto/picture.proto`, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition).biz;
const grpcClient = new proto.Picture(
  `${gRPC.bizService.host}:${gRPC.bizService.port}`,
  grpc.credentials.createInsecure(), {
    'grpc.max_receive_message_length': gRPC.bizService.option['grpc.max_receive_message_length'],
    'grpc.max_send_message_length': gRPC.bizService.option['grpc.max_send_message_length'],
  },
);

module.exports = grpcClient;
