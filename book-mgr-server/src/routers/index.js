const auth = require('./auth/index');
const inviteCode = require('./InviteCode/index');
const book = require('./book/index')

module.exports = (app) => {
  // 通过app.use注册中间件
  // 中间件的本质就是一个函数，提供服务
  // 中间件按照注册顺序执行
  app.use(auth.routes());
  app.use(inviteCode.routes());
  app.use(book.routes())
};