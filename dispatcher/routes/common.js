const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const Router = require('@koa/router')

const config = require('../config')

const packageDefinition = protoLoader.loadSync(__dirname + '/../protos/common.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})
const proto = grpc.loadPackageDefinition(packageDefinition).common
const grpcClient = new proto.Common(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure()
)

const router = new Router({
  prefix: '/api/common'
})

module.exports = router

router.get('/:id', async ctx => {
  const fetch = body => {
    return new Promise((resolve, reject) => {
      grpcClient.get({data: JSON.stringify(body)}, (err, response) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        }
        resolve(JSON.parse(response.data))
      })
    })
  }
  try {
    ctx.response.body = await fetch(ctx.params)
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误' }
  }
})
router.put('/:id', async ctx => {
  const fetch = body => {
    return new Promise((resolve, reject) => {
      grpcClient.update({data: JSON.stringify(body)}, (err, response) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        }
        resolve(JSON.parse(response.data))
      })
    })
  }
  try {
    ctx.response.body = await fetch(Object.assign(ctx.params, ctx.request.body))
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误' }
  }
})
router.delete('/:id', async ctx => {
  const fetch = body => {
    return new Promise((resolve, reject) => {
      grpcClient.remove({data: JSON.stringify(body)}, (err, response) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        }
        resolve(JSON.parse(response.data))
      })
    })
  }
  try {
    ctx.response.body = await fetch(ctx.params)
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误' }
  }
})


router.get('/', async ctx => {
  const fetch = body => {
    return new Promise((resolve, reject) => {
      grpcClient.list({data: JSON.stringify(body)}, (err, response) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        }
        resolve(JSON.parse(response.data))
      })
    })
  }
  try {
    ctx.response.body = await fetch(ctx.request.query)
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误' }
  }
})
router.post('/', async ctx => {
  const fetch = body => {
    return new Promise((resolve, reject) => {
      grpcClient.save({data: JSON.stringify(body)}, (err, response) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        }
        resolve(JSON.parse(response.data))
      })
    })
  }
  try {
    ctx.response.body = await fetch(ctx.request.body)
  } catch (err) {
    console.error(err)
    ctx.response.body = { message: '服务器错误' }
  }
})
