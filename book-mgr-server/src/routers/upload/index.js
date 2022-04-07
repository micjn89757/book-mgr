const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const config = require('../../project.config');
const { saveFileToDisk, getUploadFileExt } = require('../../helpers/upload');
const path = require('path');

// const { getBody } = require('../../helpers/utils');
const User = mongoose.model('User');
const Character = mongoose.model('Character');

const router = new Router({
  prefix: '/upload',
});

router.post('/file', async (ctx) => {
  const ext = getUploadFileExt(ctx); // 获取文件后缀
  const filename = `${uuidv4()}.${ext}`;
  await saveFileToDisk(
    ctx, path.resolve(config.UPLOAD_DIR, filename)
  );

  ctx.body = {
    data: filename,
    msg: '',
    code: 1,
  };
});

module.exports = router;
