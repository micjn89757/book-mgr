const Router = require('@koa/router');
const mongoose = require('mongoose');

const InventoryLog = mongoose.model('InventoryLog');

const router = new Router({
  prefix: '/inventoryLog'
});

// ctx（context）上下文-当前请求的相关信息都在里面
router.get('/list',async (ctx) => {
  const {
    type, //出库还是入库
    size,
    page
  } = ctx.query;
  // console.log(ctx.query);


  // 找到第n页的x条日志（出库/入库）
  const list = await InventoryLog.find({
    type,
  }).sort({
    _id: -1 // 通过id排序，根据时间倒序排列
  }).skip((page - 1) * size).limit(size).exec();
  // console.log(list);

  // 获取出库或入库全部的日志
  const total = await InventoryLog.find({type}).countDocuments().exec();

  ctx.body = {
    data: {
      total,
      list,
      page,
      size
    },
    code: 1,
    msg: '获取列表成功'
  }

});


module.exports = router;