const Router = require('@koa/router');

const logger = require('../logger');
const messageStub = require('../grpc/message-stub');

const router = new Router({
  prefix: '/api/message',
});

module.exports = router;

router.get('/', async (ctx) => {
  const fetch = (data) => new Promise((resolve, reject) => {
    messageStub.listUnread(data, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await fetch({ user_id: parseInt(ctx.request.query.user_id, 10) });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});
