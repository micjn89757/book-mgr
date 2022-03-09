// nodejs默认使用的是commonjs规范
//require  module.exports
//require一个文件，这个文件就会被执行
const Koa = require('koa');

const app = new Koa();


// 通过app.use注册中间件
// 中间件的本质就是一个函数，提供服务
// 中间件按照注册顺序执行
// ctx（context）上下文-当前请求的相关信息都在里面
app.use(async (ctx, next) => {
  // 对象的解构
  // req为别名
  const { request: req } = ctx;
  const { url } = req;

  if( url == '/') {
    // ctx.body = ctx.response.body
    ctx.body = "<h1>主页</h1>";
    return;
  }

  // 路由"/user/list"
  if( url == '/user/list') {
    ctx.body = "<h1>用户列表<h1/>";
    return;
  }

  ctx.body = "404";
  await next(); // 按照顺序执行下一个中间件
  ctx.status = 404;
});

app.use(async (ctx) => {
  ctx.body = "找不到资源"
})

// 开启一个http服务，http默认端口80
// 接收http请求并作处理，处理完后做响应
// 监听端口3000 
// https默认端口是443
app.listen(3000, () => {
  console.log('启动成功');
});