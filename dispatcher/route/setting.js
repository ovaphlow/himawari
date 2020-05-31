const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const Router = require('@koa/router');

const gRPC = require('../config/gRPC');
const logger = require('../logger');

const packageDefinition = protoLoader.loadSync(`${__dirname}/../protos/setting.proto`, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition).common;
const grpcClient = new proto.Common(
  `${gRPC.host}:${gRPC.port}`,
  grpc.credentials.createInsecure(),
);

const router = new Router({
  prefix: '/api/setting',
});

module.exports = router;

router.get('/vault/', async (ctx) => {
  const fetch = (body) => new Promise((resolve, reject) => {
    grpcClient.get({ data: JSON.stringify(body) }, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await fetch(ctx.params);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
})
