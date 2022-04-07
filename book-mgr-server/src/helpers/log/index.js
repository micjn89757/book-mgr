const { verify, getToken } = require('../token');
const mongoose = require('mongoose');

const Log = mongoose.model('Log');
const LogResponse = mongoose.model('LogResponse');

// 中间件
const logMiddleware = async (ctx, next) => {
  const startTime = Date.now();

  await next();

  // 先解析token中的用户信息
  let payload = {};
  try {
    payload = await verify(getToken(ctx));
  } catch (e) {
    payload = {
      account: '未知用户',
      id: '',
    };
  }

  const url = ctx.url;
  const method = ctx.method;
  const status = ctx.status; // 状态码

  let show = true;

  if (url === '/log/delete') {
    show = false;
  }

  // 响应体单独存
  let responseBody = '';

  // 不是字符串就是json
  if (typeof ctx.body === 'string') {
    responseBody = ctx.body;
  } else {
    try {
      responseBody = JSON.stringify(ctx.body);
    } catch {
      responseBody = '';
    }
  }

  const endTime = Date.now();

  // 保存从token解析出的数据
  const log = new Log({
    user: {
      account: payload.account,
      id: payload.id,
    },
    request: {
      url,
      method,
      status,
    },

    endTime,
    startTime,
    show,
  });

  log.save();

  const logRes = new LogResponse({
    logId: log._id,
    data: responseBody,
  });

  logRes.save();
};

module.exports = {
  logMiddleware,
};
