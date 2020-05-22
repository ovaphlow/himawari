const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const logger = require('./logger');
const routerArchive = require('./route/archive');
const routerCommon = require('./route/common');
const routerUser = require('./route/user');
const routerVault = require('./route/vault');

const app = new Koa();

app.env = 'production';

app.use(bodyParser({ jsonLimit: '4mb' }));

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
  app.use(routerCommon.routes());
  app.use(routerCommon.allowedMethods());
})();

(() => {
  app.use(routerUser.routes());
  app.use(routerUser.allowedMethods());
})();

(() => {
  app.use(routerVault.routes());
  app.use(routerVault.allowedMethods());
})();

module.exports = app;
