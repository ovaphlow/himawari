const Router = require('@koa/router');

const logger = require('../logger');
const messageStub = require('../grpc/message-stub');

const router = new Router({
  prefix: '/api/message',
});

module.exports = router;

router.put('/:id/mark-read', async (ctx) => {
  const fetch = (data) => new Promise((resolve, reject) => {
    messageStub.markRead(data, (err, response) => {
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
    messageStub.list(data, (err, response) => {
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
      user_id: parseInt(ctx.request.query.user_id, 10),
      status: JSON.stringify({ status: ctx.request.query.status }),
    });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});
