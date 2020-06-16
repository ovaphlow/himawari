const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const Router = require('@koa/router');

const gRPC = require('../config/gRPC');
const logger = require('../logger');

const packageDefinition = protoLoader.loadSync(`${__dirname}/../proto/picture.proto`, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition).picture;
const grpcClient = new proto.PictureService(
  `${gRPC.bizService.host}:${gRPC.bizService.port}`,
  grpc.credentials.createInsecure(), {
    'grpc.max_receive_message_length': gRPC.bizService.option['grpc.max_receive_message_length'],
    'grpc.max_send_message_length': gRPC.bizService.option['grpc.max_send_message_length'],
  },
);

const router = new Router({
  prefix: '/api/picture',
});

module.exports = router;

router.get('/:id', async (ctx) => {
  const fetch = (body) => new Promise((resolve, reject) => {
    grpcClient.get(body, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await fetch({
      id: parseInt(ctx.params.id, 10),
      uuid: ctx.request.query.uuid,
      archive_id: parseInt(ctx.request.query.archive_id, 10),
    });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.put('/', async (ctx) => {
  const fetch = (body) => new Promise((resolve, reject) => {
    grpcClient.list(body, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await fetch(ctx.request.body);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.post('/', async (ctx) => {
  const fetch = (body) => new Promise((resolve, reject) => {
    grpcClient.save(body, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await fetch(ctx.request.body);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});
