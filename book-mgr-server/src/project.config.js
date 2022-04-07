const path = require('path');

module.exports = {
  // 配置项
  // 默认密码/重置密码
  DEFAULT_PASSWORD: "123123",
  // token密钥
  JWT_SECRET: 'book-mgr',
  UPLOAD_DIR: path.resolve(__dirname, '../upload') // 路径，将文件保存到外层upload文件夹里
}