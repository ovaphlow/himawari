const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const Router = require('@koa/router');
const multer = require('@koa/multer');
const xlsx = require('node-xlsx');

const upload = multer();

const gRPC = require('../config/gRPC');
const logger = require('../logger');

const packageDefinition = protoLoader.loadSync(`${__dirname}/../proto/archive.proto`, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition).archive;
const grpcClient = new proto.ArchiveService(
  `${gRPC.host}:${gRPC.port}`,
  grpc.credentials.createInsecure(), {
    'grpc.max_receive_message_length': gRPC.option['grpc.max_receive_message_length'],
    'grpc.max_send_message_length': gRPC.option['grpc.max_send_message_length'],
  },
);

const router = new Router({
  prefix: '/api/archive',
});

module.exports = router;

router.post('/import-data', upload.single('file'), async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    grpcClient.save({ data: JSON.stringify(body) }, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });

  const sheets = xlsx.parse(ctx.request.file.buffer);
  const { data } = sheets[0];
  const resp = { message: '', content: '' };
  const loop = async (i) => {
    if (data.length < i + 1) return;
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
    };
    if (!archive.sn || !archive.identity || !archive.name) {
      resp.message = `缺少关键数据，档案号：${archive.sn}，身份证：${archive.identity}，姓名：${archive.name}`;
      return;
    }
    const res = await grpcFetch(archive);
    if (res.message) {
      resp.message = `导入数据时发生错误，档案号：${archive.sn}，身份证：${archive.identity}，姓名：${archive.name}`;
      return;
    }
    loop(i + 1);
  };
  loop(1);
  ctx.response.body = resp;
});

/**
   * 查询指定档案号或身份证的单个档案
   */
router.put('/search', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    grpcClient.search(body, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await grpcFetch(ctx.request.body);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.put('/check-valid', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    grpcClient.checkValid(body, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await grpcFetch(ctx.request.body);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.put('/check-valid-with-id', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    grpcClient.checkValidWithId(body, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await grpcFetch(ctx.request.body);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.post('/transfer-in/', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    grpcClient.transferIn(body, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await grpcFetch(ctx.request.body);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.get('/:id', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    grpcClient.get(body, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await grpcFetch({
      id: parseInt(ctx.params.id, 10),
      uuid: ctx.request.query.uuid,
    });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.put('/:id', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    grpcClient.update(body, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await grpcFetch({
      id: parseInt(ctx.params.id, 10),
      ...ctx.request.body,
    });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.delete('/:id', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    grpcClient.remove({ data: JSON.stringify(body) }, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await grpcFetch({
      id: parseInt(ctx.params.id, 10),
      uuid: ctx.request.query.uuid
    });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

/**
   * 查询档案，返回结果最多2000条
   * 参数：档案号或身份证或姓名
   */
router.put('/', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    grpcClient.filter(body, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    ctx.response.body = await grpcFetch({ filter: ctx.request.body.filter });
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});

router.post('/', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    grpcClient.save(body, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  try {
    logger.info(ctx.request.body);
    ctx.response.body = await grpcFetch(ctx.request.body);
  } catch (err) {
    logger.error(err);
    ctx.response.body = { message: '服务器错误' };
  }
});
