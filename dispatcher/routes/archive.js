const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const Router = require('@koa/router')
const multer = require('@koa/multer')
const xlsx = require('node-xlsx')

const upload = multer()

const config = require('../config')

const packageDefinition = protoLoader.loadSync(__dirname + '/../protos/archive.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})
const proto = grpc.loadPackageDefinition(packageDefinition).archive
const grpcClient = new proto.Archive(
  `${config.grpcServer.host}:${config.grpcServer.port}`,
  grpc.credentials.createInsecure()
)

const router = new Router({
  prefix: '/api/archive'
})

module.exports = router

router
  .post('/import-data', upload.single('file'), async ctx => {
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

    // console.info('ctx.request.file', ctx.request.file)
    const sheets = xlsx.parse(ctx.request.file.buffer)
    const data = sheets[0].data
    let resp = {message: '', content: ''}
    const loop = async (data, i) => {
      if (data.length < i + 1) return
      const archive = {
        sn: data[i][1],
        sn_alt: '',
        identity: data[i][3],
        name: data[i][2],
        birthday: data[i][4],
        cangongshijian: '',
        zhicheng: '',
        gongling: '',
        yutuixiuriqi: '',
        tuixiuriqi: '',
        remark: data[i][6],
        vault_id: ctx.request.body.vault_id,
        phone: data[i][5],
      }
      if (!!!archive.sn || !!!archive.identity || !!!archive.name) {
        resp.message = `缺少关键数据，档案号：${archive.sn}，身份证：${archive.identity}，姓名：${archive.name}`
        return
      }
      const res = await grpcFetch(archive)
      if (res.message) {
        resp.message = `导入数据时发生错误，档案号：${archive.sn}，身份证：${archive.identity}，姓名：${archive.name}`
        return
      }
      loop(data, i + 1)
    }
    loop(data, 1)
    ctx.response.body = resp
  })

router
  /**
   * 查询指定档案号或身份证的单个档案
   */
  .put('/search', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.search({data: JSON.stringify(body)}, (err, response) => {
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
  /**
   * 查询档案，返回结果最多2000条
   * 参数：档案号或身份证或姓名
   */
  .put('/filter', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.filter({data: JSON.stringify(body)}, (err, response) => {
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
  .put('/check-valid', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.checkValid({data: JSON.stringify(body)}, (err, response) => {
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
  .put('/check-valid-with-id', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.checkValidWithId({data: JSON.stringify(body)}, (err, response) => {
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
  .post('/transfer-out', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.transferOut({data: JSON.stringify(body)}, (err, response) => {
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
  .post('/transfer-in', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.transferIn({data: JSON.stringify(body)}, (err, response) => {
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

router
  .get('/isolate/', async ctx => {
    const grpcFetch = () => {
      return new Promise((resolve, reject) => {
        grpcClient.listIsolate({data: ''}, (err, response) => {
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
  .put('/isolate/filter', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.filterIsolate({data: JSON.stringify(body)}, (err, response) => {
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
  .get('/isolate/:id', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.getIsolate({data: JSON.stringify(body)}, (err, response) => {
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
  .put('/isolate/:id', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.updateIsolate({data: JSON.stringify(body)}, (err, response) => {
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
  .delete('/isolate/:id', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.removeIsolate({data: JSON.stringify(body)}, (err, response) => {
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
  .post('/:id/base64', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.saveBase64({data: JSON.stringify(body)}, (err, response) => {
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
      ctx.request.body.master_id = ctx.params.id
      ctx.response.body = await grpcFetch(ctx.request.body)
    } catch (err) {
      console.error(err)
      ctx.response.body = {message: '服务器错误'}
    }
  })
  .get('/:id/picture/', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.listPicture({data: JSON.stringify(body)}, (err, response) => {
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
 .get('/:master_id/picture/:id', async ctx => {
    const grpcFetch = body => {
      return new Promise((resolve, reject) => {
        grpcClient.getPicture({data: JSON.stringify(body)}, (err, response) => {
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
      ctx.response.body = await grpcFetch(ctx.request.body)
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
