const fs = require('fs');
const path = require('path');

const Router = require('@koa/router');
const multer = require('@koa/multer');
const uuid = require('uuid');

const upload = multer();

const logger = require('../logger');
const archiveStub = require('../grpc/archive-stub');
const fileStub = require('../grpc/file-stub');

const router = new Router({
  prefix: '/api/archive',
});

module.exports = router;

router.post('/import-data', upload.single('file'), async (ctx) => {
  if (!ctx.request.file.buffer) {
    ctx.response.body = { message: '没有上传文件', content: '' };
    return;
  }

  const file_name = `${uuid.v5(`${new Date()}`, uuid.v5.DNS)}.xlsx`;
  const file_path = path.join('..', 'utility-service', 'temp_file', file_name);
  fs.writeFile(file_path, ctx.request.file.buffer, 'utf8', (err) => {
    if (err) {
      logger.error(err);
      ctx.response.body = { message: '服务器错误', content: '' };
    }
  });
  const fetch = (body) => new Promise((resolve, reject) => {
    fileStub.parseXlsx(body, (err, response) => {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(JSON.parse(response.data));
    });
  });
  ctx.response.body = await fetch({
    file_name,
    user_id: ctx.request.body.user_id,
    vault_id: ctx.request.body.vault_id,
  });
});

/**
 * 查询指定档案号或身份证的单个档案
 */
router.put('/search', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    archiveStub.search(body, (err, response) => {
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
    archiveStub.checkValid(body, (err, response) => {
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
    archiveStub.checkValidWithId(body, (err, response) => {
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
    archiveStub.transferIn(body, (err, response) => {
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
    archiveStub.get(body, (err, response) => {
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
    archiveStub.update(body, (err, response) => {
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
    archiveStub.remove(body, (err, response) => {
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

/**
   * 查询档案，返回结果最多2000条
   * 参数：档案号或身份证或姓名
   */
router.put('/', async (ctx) => {
  const grpcFetch = (body) => new Promise((resolve, reject) => {
    archiveStub.filter(body, (err, response) => {
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
    archiveStub.save(body, (err, response) => {
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
