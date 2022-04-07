const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers.js')
/**
 * 给哪个数据库的哪个集合
 * 添加什么格式的文档
 */


//创建一个集合(Schema)
//Schema 映射了MongoDB下的一个集合，并且他的内容就是集合下文档的构成 
const UserSchema = new mongoose.Schema({
  account: String,
  password: String,

  character: String, // 用户角色包括，文案类型，权限, 这里存放的是对应角色的ID

  hasCode: Boolean, // 是否有邀请码

  meta: getMeta()
});

// mongoose每次在保存数据的时候先执行检查
UserSchema.pre('save', preSave);

//Modal 根据Schema生成的一套方法集合(模型)，这套方法用来操作集合和集合下的文档
//默认会在数据库中生成users集合
mongoose.model("User", UserSchema);