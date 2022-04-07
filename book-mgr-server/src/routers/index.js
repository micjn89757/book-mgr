const auth = require('./auth/index');
const inviteCode = require('./InviteCode/index');
const book = require('./book/index');
const inventoryLog = require('./InventoryLog/index');
const user = require('./user/index');
const character = require('./character/index');
const log = require('./log/index');
const forgetPassword = require('./forgetPassword/index');
const profile = require('./profile/index')
const dashboard = require('./dashboard/index')
const upload = require('./upload/index')

module.exports = (app) => {
  // 通过app.use注册中间件
  // 中间件的本质就是一个函数，提供服务
  // 中间件按照注册顺序执行
  app.use(auth.routes());
  app.use(inviteCode.routes());
  app.use(book.routes());
  app.use(inventoryLog.routes());
  app.use(user.routes());
  app.use(character.routes());
  app.use(log.routes());
  app.use(forgetPassword.routes());
  app.use(profile.routes());
  app.use(dashboard.routes());
  app.use(upload.routes());
};