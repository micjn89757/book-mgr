const Router = require('@koa/router');
const mongoose = require('mongoose');


const Log = mongoose.model('Log');

const router = new Router({
  prefix: '/log',
});

// 获取日志列表
router.get('/list', async (ctx) => {
  let {
    page,
    size,
  } = ctx.query;

  page = Number(page);
  size = Number(size);

  const list = await Log
    .find({
      show: true,
    })
    .sort({
      _id: -1,
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec();

  const total = await Log.find({show: true}).countDocuments().exec();
  
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

// 删除日志
router.post('/delete', async (ctx) => {
  const {
    id,
  } = ctx.request.body;

  const one = await Log.findOne({
    _id: id,
  }).exec();

  if (!one) {
    ctx.body = {
      data: {},
      msg: '删除成功',
      code: 0,
    };
    return;
  }

  one.show = false;

  await one.save();

  ctx.body = {
    code: 1,
    msg: '删除成功',
  };
});

module.exports = router;
