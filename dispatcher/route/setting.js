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
const proto = grpc.loadPackageDefinition(packageDefinition).himawari;
const grpcClient = new proto.Setting(
  `${gRPC.host}:${gRPC.port}`,
  grpc.credentials.createInsecure(),
);

const router = new Router({
  prefix: '/api/setting',
});

module.exports = router;

router.get('/:id', async (ctx) => {
  const fetch = (data) => new Promise((resolve, reject) => {
    grpcClient.get(data, (err, response) => {
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
    });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.put('/:id', async (ctx) => {
  const fetch = (data) => new Promise((resolve, reject) => {
    grpcClient.update(data, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await fetch({ id: parseInt(ctx.params.id, 10), ...ctx.request.body });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.delete('/:id', async (ctx) => {
  const fetch = (data) => new Promise((resolve, reject) => {
    grpcClient.remove(data, (err, response) => {
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
    });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.get('/', async (ctx) => {
  const fetch = (data) => new Promise((resolve, reject) => {
    grpcClient.list(data, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await fetch({ cat: ctx.request.query.cat });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.post('/', async (ctx) => {
  const fetch = (data) => new Promise((resolve, reject) => {
    grpcClient.save(data, (err, response) => {
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
    ctx.response.body = { message: '服务器错误', content: '' };
  }
});