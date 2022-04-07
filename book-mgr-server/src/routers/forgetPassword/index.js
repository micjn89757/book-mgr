const Router = require('@koa/router');
const mongoose = require('mongoose');
const config  = require('../../project.config');

const ForgetPassword = mongoose.model('ForgetPassword');
const User = mongoose.model('User');''

const router = new Router({
  prefix: '/forget-password',
});

// 获取已申请重置密码列表
router.get('/list', async (ctx) => {
  let {
    page,
    size,
  } = ctx.request.query;

  page = Number(page);
  size = Number(size);

  const list = await ForgetPassword
    .find({
      status: 1,
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await ForgetPassword
    .find({
      status: 1,
    })
    .countDocuments().exec();

  ctx.body = {
    data: {
      list,
      page,
      size,
      total,
    },
    code: 1,
    msg: '获取列表成功',
  };
});

// 忘记密码申请
router.post('/add', async (ctx) => {
  const {
    account,
  } = ctx.request.body;

  // 账户存在
  const user = await User.findOne({
    account,
  }).exec();

  if (user && user.password === config.DEFAULT_PASSWORD) {
    ctx.body = {
      code: 1,
      msg: '申请成功',
    };

    return;
  }else if(!user) {
    ctx.body = {
      code: 1,
      msg: '申请成功',
    };

    return;
  }

  // 在 forget-password 集合中存在 status 为 1 的文档
  const one = await ForgetPassword.findOne({
    account,
    status: 1,
  }).exec();

  if(one) {
    ctx.body = {
      code: 1,
      msg: '申请成功',
    };

    return;
  }

  const forgetPwd = new ForgetPassword({
    account,
    status: 1,
  });

  await forgetPwd.save();

  ctx.body = {
    code: 1,
    msg: '申请成功',
  };
});

// 更新状态, 重置或者忽略
router.post('/update/status', async (ctx) => {
  const {
    id,
    status,
  } = ctx.request.body;

  const one = await ForgetPassword.findOne({
    _id: id,
  });

  if (!one) {
    ctx.body = {
      msg: '找不到这条申请',
      code: 0,
    };

    return;
  }

  one.status = status;

  if (status === 2) {
    const user = await User.findOne({
      account: one.account,
    }).exec();

    if (user) {
      user.password = config.DEFAULT_PASSWORD;

      await user.save();
    }
  }

  await one.save();

  ctx.body = {
    code: 1,
    msg: '处理成功',
  };
});

module.exports = router;
