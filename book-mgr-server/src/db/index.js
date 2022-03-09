const mongoose = require('mongoose');

/**
 * 给哪个数据库的哪个集合
 * 添加什么格式的文档
 */


//创建一个集合(Schema)
//Schema 映射了MongoDB下的一个集合，并且他的内容就是集合下文档的构成
const UserSchema = new mongoose.Schema({
  nickname: String,
  password: String,
  age: Number
})

//Modal 根据Schema生成的一套方法集合，这套方法用来操作集合和集合下的文档
const UserModal = mongoose.model("User", UserSchema);


const connect = () => {
  //连接数据库,选择数据库名字为book-mgr
  mongoose.connect("mongodb://127.0.0.1:27017/book-mgr");

  //当数据库被打开的时候 do sth
  mongoose.connection.on('open', () => {
    console.log("连接成功");

    //创建文档
    const user = new UserModal({
      nickname: "小红",
      password: "123456",
      age: 12
    });

    user.age = 20;
    // 保存, 同步到MongoDB
    user.save();
  });
};

connect();