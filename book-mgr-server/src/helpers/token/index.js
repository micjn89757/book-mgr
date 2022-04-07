const jwt = require('jsonwebtoken');
const config = require("../../project.config.js");
const koaJwt = require("koa-jwt")

// // 第二的参数是密钥，用来加密
// let token = jwt.sign({ 
//   account: "a.cc.com",
//   _id: "123"
// }, 'shhhh');

const getToken = (ctx) => {
  let { authorization } = ctx.header;
  return authorization.replace('Bearer ', '').replace('bearer ', '')
}

const verify = (token) => {
  return new Promise((resolve, reject) => {
    // 一个Token由三个部分组成
    // header: 加密的算法 sha256， jwt
    // payload 传递的参数，用户真正想拿到的信息
    // signature: 签证相关内容
    // Token放在http请求头Authorization中, Authorization:Bearer空格token
    // verify用来进行验证
    jwt.verify(token, config.JWT_SECRET, (err,payload) => {
      if(err) {
        reject(err);
        return;
      }

      // 如果解析成功
      resolve(payload);
    });
  })
}

// 中间件，用来对每个路由进行Token校验
const middleware = (app) => {
  app.use(koaJwt({
    secret: config.JWT_SECRET
  }).unless({
    // unless是排除一些路由，这些不用校验
    path: [
      /^\/auth\/login/,  // 登录接口不需要校验
      /^\/auth\/register/,  // 注册接口不需要校验
      /^\/forget-password\/add/ // 忘记密码不需要校验
    ]
  }))
}

// 捕获token校验异常
const catchTokenError = async (ctx, next) => {
  return next().catch((error) => { // 捕获下一个中间件的错误
    if(error.status === 401) {
      ctx.status = 401;

      ctx.body = {
        code: 0,
        msg: 'token error'
      }
    }else {
      throw error;
    }
  })
}

module.exports = {
  verify,
  getToken,
  middleware,
  catchTokenError
}


