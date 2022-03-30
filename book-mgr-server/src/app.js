// nodejs默认使用的是commonjs规范
//require  module.exports
//!require一个文件，这个文件就会被执行
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
// 这里默认会去寻找./routers目录下的index.js文件
const { connect } = require('./db');
const registerRoutes = require('./routers');

const app = new Koa();

// 连接好了数据库再开始接收请求
connect().then(() => {
  // 注册路由
  app.use(cors());
  app.use(koaBody());
  registerRoutes(app);

  // 监听端口3000 
  // https默认端口是443
  app.listen(3000, () => {
    console.log('服务启动成功');
  });
})

