const mongoose = require('mongoose');
const { getMate } = require('../helpers.js')
/**
 * 给哪个数据库的哪个集合
 * 添加什么格式的文档
 */


//创建一个集合(Schema)
//Schema 映射了MongoDB下的一个集合，并且他的内容就是集合下文档的构成 
const UserSchema = new mongoose.Schema({
  account: String,
  password: String,

  meta: getMate()
});

//Modal 根据Schema生成的一套方法集合(模型)，这套方法用来操作集合和集合下的文档
mongoose.model("User", UserSchema);