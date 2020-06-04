const path = require('path');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const staticCache = require('koa-static-cache');

const logger = require('./logger');
const routerArchive = require('./route/archive');
const routerPicture = require('./route/picture');
const routerArchiveIsolated = require('./route/archive-isolated');
const routerUser = require('./route/user');
const routerSetting = require('./route/setting');

const app = new Koa();

app.env = 'production';

app.use(bodyParser({ jsonLimit: '4mb' }));

app.use(staticCache(path.join(__dirname, '../webapp-alt/dist'), {
  maxAge: 60 * 60 * 24 * 7,
  gzip: true,
}));

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  logger.log(`${new Date()} [${ctx.method}] ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx);
});

(() => {
  app.use(routerArchive.routes());
  app.use(routerArchive.allowedMethods());
})();

(() => {
  app.use(routerPicture.routes());
  app.use(routerPicture.allowedMethods());
})();

(() => {
  app.use(routerArchiveIsolated.routes());
  app.use(routerArchiveIsolated.allowedMethods());
})();

(() => {
  app.use(routerUser.routes());
  app.use(routerUser.allowedMethods());
})();

(() => {
  app.use(routerSetting.routes());
  app.use(routerSetting.allowedMethods());
})();

module.exports = app;
