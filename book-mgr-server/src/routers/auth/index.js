const Router = require('@koa/router');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const router = new Router({
  prefix: '/auth'
});

// ctx（context）上下文-当前请求的相关信息都在里面
router.post('/register',async (ctx) => {
  const {account, password} = ctx.request.body;

  const user = new User({
    account: account,
    password: password,
  }); 

  const one = await User.findOne({
    account
  }).exec();

  if(one) {
    ctx.body = {
      code: '0', 
      msg: '已存在该用户',
      data: null 
    }
    return;
  }

  // 返回数据
  const res = await user.save();
  ctx.body = {
    code: '1', 
    msg: '添加成功',
    data: res 
  }

});

router.post('/login', async (ctx) => {
  ctx.body = '登入成功';
});

module.exports = router;