const gRPC = {
  bizService: {
    host: '192.168.1.248',
    port: 8911,
    option: {
      'grpc.max_send_message_length': 1024 * 1024 * 256,
      'grpc.max_receive_message_length': 1024 * 1024 * 256,
    },
  },
  miscService: {
    host: '192.168.1.248',
    port: 8912,
    option: {
      'grpc.max_send_message_length': 1024 * 1024 * 256,
      'grpc.max_receive_message_length': 1024 * 1024 * 256,
    },
  },
  utilityService: {
    host: '192.168.1.248',
    port: 8913,
  },
};

module.exports = gRPC;
