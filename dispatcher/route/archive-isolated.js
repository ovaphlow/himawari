const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const Router = require('@koa/router');
// const multer = require('@koa/multer');
// const xlsx = require('node-xlsx');

// const upload = multer();

const gRPC = require('../config/gRPC');
const logger = require('../logger');

const packageDefinition = protoLoader.loadSync(`${__dirname}/../proto/archive-isolated.proto`, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition).archive_isolated;
const grpcClient = new proto.ArchiveIsolatedService(
  `${gRPC.host}:${gRPC.port}`,
  grpc.credentials.createInsecure(), {
    'grpc.max_receive_message_length': gRPC.option['grpc.max_receive_message_length'],
    'grpc.max_send_message_length': gRPC.option['grpc.max_send_message_length'],
  },
);

const router = new Router({
  prefix: '/api/archive-isolated',
});

module.exports = router;

router.post('/transfer-in', async (ctx) => {
  const fetch = (body) => new Promise((resolve, reject) => {
    grpcClient.transferIn(body, (err, response) => {
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
})

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
    });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.put('/:id', async (ctx) => {
  const fetch = (body) => new Promise((resolve, reject) => {
    grpcClient.update(body, (err, response) => {
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
      ...ctx.request.body,
    });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.delete('/:id', async (ctx) => {
  const fetch = (body) => new Promise((resolve, reject) => {
    grpcClient.remove(body, (err, response) => {
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

router.put('/', async (ctx) => {
  const fetch = (body) => new Promise((resolve, reject) => {
    grpcClient.filter(body, (err, response) => {
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
