const gRPC = {
  // host: '192.168.1.248',
  host: '127.0.0.1',
  port: 8911,
  option: {
    'grpc.max_send_message_length': 1024 * 1024 * 256,
    'grpc.max_receive_message_length': 1024 * 1024 * 256,
  },
};

module.exports = gRPC;
