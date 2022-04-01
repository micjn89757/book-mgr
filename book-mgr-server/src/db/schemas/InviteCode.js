const mongoose = require('mongoose');
const { getMate } = require('../helpers.js')
/**
 * 给哪个数据库的哪个集合
 * 添加什么格式的文档
 */


//创建一个集合(Schema)
//Schema 映射了MongoDB下的一个集合，并且他的内容就是集合下文档的构成 
const InviteCodeSchema = new mongoose.Schema({
  code: String, // 邀请码
  user: String, // 用来注册哪个账号

  meta: getMate()
});

//Modal 根据Schema生成的一套方法集合(模型)，这套方法用来操作集合和集合下的文档
//默认会在数据库中生成users集合
mongoose.model("InviteCode", InviteCodeSchema);