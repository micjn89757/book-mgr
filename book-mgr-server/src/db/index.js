require('./schemas/User');
require('./schemas/InviteCode');
require('./schemas/Book');
require('./schemas/InventoryLog');
require('./schemas/Character');
require('./schemas/Log');
require('./schemas/LogResponse')
require('./schemas/ForgetPassword')

const mongoose = require('mongoose');


const connect = () => {
  return new Promise((resolve) => {
    //连接数据库,选择数据库名字为book-mgr
    mongoose.connect("mongodb://127.0.0.1:27017/book-mgr");

    //当数据库被打开的时候 do sth
    mongoose.connection.on('open', () => {
      console.log("连接数据库成功");
      resolve('s');
    }); 
  });  
};

module.exports = {
  connect,
};