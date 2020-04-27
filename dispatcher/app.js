const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const config = require('./config')

const app = new Koa()

app.env = config.env

app.use(bodyParser({
  jsonLimit: '4mb'
}))

app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${new Date()} [${ctx.method}] ${ctx.url} - ${rt}`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

const archiveRouter = require('./routes/archive')
app.use(archiveRouter.routes())
app.use(archiveRouter.allowedMethods())

const deptRouter = require('./routes/dept')
app.use(deptRouter.routes())
app.use(deptRouter.allowedMethods())

const userRouter = require('./routes/user')
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

const vaultRouter = require('./routes/vault')
app.use(vaultRouter.routes())
app.use(vaultRouter.allowedMethods())

module.exports = app
