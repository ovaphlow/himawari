const Router = require('@koa/router');

const logger = require('../logger');
const pictureStub = require('../grpc/picture-stub');

const router = new Router({
  prefix: '/api/picture',
});

module.exports = router;

router.get('/:id', async (ctx) => {
  const fetch = (body) => new Promise((resolve, reject) => {
    pictureStub.get(body, (err, response) => {
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
    pictureStub.list(body, (err, response) => {
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
    pictureStub.save(body, (err, response) => {
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
