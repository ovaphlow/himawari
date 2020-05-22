const gRPC = {
  host: '127.0.0.1',
  port: 5001,
  option: {
    'grpc.max_send_message_length': 1024 * 1024 * 256,
    'grpc.max_receive_message_length': 1024 * 1024 * 256,
  },
};

module.exports = gRPC;
