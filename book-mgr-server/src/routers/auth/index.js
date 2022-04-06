const Router = require('@koa/router');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { getBody } = require("../../helpers/utils");
const config = require("../../project.config");


const User = mongoose.model('User');
const InviteCode = mongoose.model('InviteCode');


const router = new Router({
  prefix: '/auth'
});

// ctx（context）上下文-当前请求的相关信息都在里面
// 注意服务端和前端都要进行数据校验，因为可能客户没有通过浏览器进行访问
router.post('/register',async (ctx) => {
  const {account, password, inviteCode} = getBody(ctx);

  // 账号密码校验
  if(account === '' || password === '' || inviteCode === '') {
    ctx.body = {
      code: 0,
      msg:  "字段不能为空",
      data: null
    };
    return;
  }

  // 找有没有邀请码, 并进行返回数据
  const findCode = await InviteCode.findOne({
    code: inviteCode
  }).exec();

  // 如果没找到邀请码
  if(!findCode || findCode.user) {
    ctx.body = {
      code: 0,
      msg: "邀请码不正确或已经被使用",
      data: null
    }

    return;
  }

  // 找account传递来的用户
  const findUser = await User.findOne({
    account
  }).exec();

  // 判断有没有用户
  if(findUser) {
    ctx.body = {
      code: 0, 
      msg: '已存在该用户',
      data: null 
    }
    return;
  }

  // 创建一个用户
  const user = new User({
    account: account,
    password: password,
  }); 

  // 同步到MongoDB并返回数据
  const res = await user.save();

  // 如果有邀请码，就将邀请码和用户id对应起来, 同步到集合invitecodes
  findCode.user = res._id;
  findCode.meta.updatedAt = new Date().getTime();
  await findCode.save();

  ctx.body = {
    code: 1, 
    msg: '注册成功',
    data: res 
  }
});

router.post('/login', async (ctx) => {
  const {account, password} = getBody(ctx);

  if(account === '' || password === '') {
    ctx.body = {
      code: 0,
      msg:  "字段不能为空",
      data: null
    };
    return;
  }

  const one = await User.findOne({
    account,
  }).exec();

  // console.log(one);

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '用户名或密码错误',
      data: null 
    }

    return;
  }

  // 用于token返回的参数
  const user = {
    account: one.account,
    character: one.character,
    _id: one._id
  }

  if(one.password === password) {
    ctx.body = {
      code: 1,
      msg: '登录成功',
      data: {
        user: user,
        token: jwt.sign(user, config.JWT_SECRET)
      }
    }
    return;
  }

  ctx.body = {
    code: 0,
    msg: '用户名或密码错误',
    data: null 
  }
});

module.exports = router;