const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const Router = require('@koa/router');

const gRPC = require('../config/gRPC');
const logger = require('../logger');

const packageDefinition = protoLoader.loadSync(`${__dirname}/../protos/vault.proto`, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition).vault;
const grpcClient = new proto.Vault(
  `${gRPC.host}:${gRPC.port}`,
  grpc.credentials.createInsecure(),
);

const router = new Router({
  prefix: '/api/vault',
});

module.exports = router;

router.get('/:id', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
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
    ctx.response.body = await grpcFetch(ctx.params);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.put('/:id', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    grpcClient.update({ data: JSON.stringify(body) }, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await grpcFetch({
      id: parseInt(ctx.params.id, 10),
      ...ctx.request.body,
    });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.delete('/:id', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    grpcClient.remove({ data: JSON.stringify(body) }, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await grpcFetch(ctx.params);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.get('/', async (ctx) => {
  const grpcFetch = () => new Promise((resolve, reject) => {
    grpcClient.list({ data: '' }, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await grpcFetch();
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.post('/', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    grpcClient.save({ data: JSON.stringify(body) }, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await grpcFetch(ctx.request.body);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});
