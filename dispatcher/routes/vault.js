const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const Router = require('@koa/router')

const config = require('../config')

const packageDefinition = protoLoader.loadSync(__dirname + '/../protos/vault.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})
const proto = grpc.loadPackageDefinition(packageDefinition).vault
const grpcClient = new proto.Vault(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure()
)

const router = new Router({
  prefix: '/api/vault'
})

module.exports = router

router
  .get('/:id', async ctx => {
    const grpcFetch = body => {
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
      ctx.response.body = await grpcFetch(ctx.params)
    } catch (err) {
      console.error(err)
      ctx.response.body = {message: '服务器错误'}
    }
  })
  .put('/:id', async ctx => {
    const grpcFetch = body => {
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
      ctx.response.body = await grpcFetch(Object.assign({
        id: parseInt(ctx.params.id)
      }, ctx.request.body))
    } catch (err) {
      console.error(err)
      ctx.response.body = {message: '服务器错误'}
    }
  })
  .delete('/:id', async ctx => {
    const grpcFetch = body => {
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
      ctx.response.body = await grpcFetch(ctx.params)
    } catch (err) {
      console.error(err)
      ctx.response.body = {message: '服务器错误'}
    }
  })

router
  .get('/', async ctx => {
    const grpcFetch = () => {
      return new Promise((resolve, reject) => {
        grpcClient.list({data: ''}, (err, response) => {
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
      ctx.response.body = await grpcFetch()
    } catch (err) {
      console.error(err)
      ctx.response.body = {message: '服务器错误'}
    }
  })
  .post('/', async ctx => {
    const grpcFetch = body => {
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
      ctx.response.body = await grpcFetch(ctx.request.body)
    } catch (err) {
      console.error(err)
      ctx.response.body = {message: '服务器错误'}
    }
  })
