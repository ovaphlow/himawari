const gRPC = {
  bizService: {
    host: '192.168.1.248',
    port: 8911,
    option: {
      'grpc.max_send_message_length': 1024 * 1024 * 256,
      'grpc.max_receive_message_length': 1024 * 1024 * 256,
    },
  },
  miscDataService: {
    host: '192.168.1.248',
    port: 8912,
    option: {
      'grpc.max_send_message_length': 1024 * 1024 * 256,
      'grpc.max_receive_message_length': 1024 * 1024 * 256,
    },
  }
};

module.exports = gRPC;
