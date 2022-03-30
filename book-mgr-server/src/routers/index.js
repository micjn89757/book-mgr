const auth = require('./auth/index');

module.exports = (app) => {
  // 通过app.use注册中间件
  // 中间件的本质就是一个函数，提供服务
  // 中间件按照注册顺序执行
  app.use(auth.routes());
};