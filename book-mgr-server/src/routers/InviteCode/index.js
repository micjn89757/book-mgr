const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4 : uuidv4 } = require('uuid');

const InviteCode = mongoose.model('InviteCode');
const { getBody } = require("../../helpers/utils");



const router = new Router({
  prefix: '/invite'
});

// ctx（context）上下文-当前请求的相关信息都在里面
// 注意服务端和前端都要进行数据校验，因为可能客户没有通过浏览器进行访问
router.get('/add',async (ctx) => {
  // 先生成一个InviteCode文档
  const code = new InviteCode({
    code: uuidv4(),
    user: ""
  });

  // 保存返回的数据
  const res = await code.save();

  ctx.body = {
    code: 1,
    msg: "创建成功",
    data: res
  }
});

module.exports = router;