// nodejs默认使用的是commonjs规范
//require  module.exports
//!require一个文件，这个文件就会被执行
const Koa = require('koa');
const koaBody = require('koa-body');
const { middleware: koaJwtMiddleware, catchTokenError } = require('./helpers/token')
const cors = require('@koa/cors');
// 这里默认会去寻找./routers目录下的index.js文件
const { connect } = require('./db');
const Routes = require('./routers');

const app = new Koa();

// 连接好了数据库再开始接收请求
connect().then(() => {
  app.use(cors());  // 跨域处理中间件
  app.use(koaBody()); // 处理post请求页提供文件上传功能

  app.use(catchTokenError)
  koaJwtMiddleware(app); // token校验

  Routes(app);   // 注册路由

  // 监听端口3000 
  // https默认端口是443
  app.listen(3000, () => {
    console.log('服务启动成功');
  });
})

