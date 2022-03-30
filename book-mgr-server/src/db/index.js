require('./schemas/User');

const mongoose = require('mongoose');


const connect = () => {
  return new Promise((resolve) => {
    //连接数据库,选择数据库名字为book-mgr
    mongoose.connect("mongodb://127.0.0.1:27017/book-mgr");

    //当数据库被打开的时候 do sth
    mongoose.connection.on('open', () => {
      console.log("连接数据库成功");
      resolve();
    });
  });  
};

module.exports = {
  connect,
};