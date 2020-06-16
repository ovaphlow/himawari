const crypto = require('crypto');

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const Router = require('@koa/router');

const gRPC = require('../config/gRPC');
const logger = require('../logger');

const packageDefinition = protoLoader.loadSync(`${__dirname}/../proto/current-user.proto`, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition).current_user;
const grpcClient = new proto.CurrentUserService(
  `${gRPC.miscDataService.host}:${gRPC.miscDataService.port}`,
  grpc.credentials.createInsecure(),
);

const router = new Router({
  prefix: '/api/current-user',
});

module.exports = router;

router.post('/sign-up', async (ctx) => {
  const fetch = (data) => new Promise((resolve, reject) => {
    grpcClient.signUp(data, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    const salt = crypto.randomBytes(8).toString('hex');
    const hmac = crypto.createHmac('sha256', salt);
    hmac.update(ctx.request.body.password);
    const password_salted = hmac.digest('hex');
    ctx.response.body = await fetch({
      uuid: ctx.request.body.uuid,
      username: ctx.request.body.username,
      password: password_salted,
      salt,
    });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.put('/sign-in', async (ctx) => {
  const fetch = (data) => new Promise((resolve, reject) => {
    grpcClient.signIn(data, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    let result = await fetch({ username: ctx.request.body.username });
    if (result.message) {
      ctx.response.body = result;
      return;
    }
    if (!result.content) {
      ctx.response.body = { message: '用户名或密码错误', content: '' };
      return;
    }
    const hmac = crypto.createHmac('sha256', result.content.salt);
    hmac.update(ctx.request.body.password);
    const password_salted = hmac.digest('hex');
    if (password_salted !== result.content.password) {
      ctx.response.body = { message: '用户名或密码错误', content: '' };
      return;
    }
    result.content.password = undefined;
    result.content.salt = undefined;
    ctx.response.body = result;
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.put('/update-password', async (ctx) => {
  const getSalt = (data) => new Promise((resolve, reject) => {
    grpcClient.getSalt(data, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  const updatePassword = (data) => new Promise((resolve, reject) => {
    grpcClient.updatePassword(data, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    let result = await getSalt({
      id: ctx.request.body.id,
      uuid: ctx.request.body.uuid,
    });
    if (result.message) {
      ctx.response.body = result;
      return;
    }
    if (!result.content.salt) {
      ctx.response.body = { message: '用户信息错误', content: '' };
      return;
    }
    const hmac = crypto.createHmac('sha256', result.content.salt);
    hmac.update(ctx.request.body.current_password);
    const password_salted = hmac.digest('hex');
    if (password_salted !== result.content.password) {
      ctx.response.body = { message: '用户名或密码错误', content: '' };
      return;
    }
    logger.info(password_salted, result.content.password);
    const hmac2 = crypto.createHmac('sha256', result.content.salt);
    hmac2.update(ctx.request.body.new_password);
    ctx.response.body = await updatePassword({
      id: ctx.request.body.id,
      uuid: ctx.request.body.uuid,
      new_password: hmac2.digest('hex'),
    })
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});
