const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers.js')


//创建一个集合(Schema)
//Schema 映射了MongoDB下的一个集合，并且他的内容就是集合下文档的构成 
// 库存日志Schema
const InventoryLogSchema = new mongoose.Schema({
  type: String, // 出库日志还是入库
  num: Number,
  user: String,

  meta: getMeta()
});

// mongoose每次在保存数据的时候先执行检查
InventoryLogSchema.pre('save', preSave);

//Modal 根据Schema生成的一套方法集合(模型)，这套方法用来操作集合和集合下的文档
//默认会在数据库中生成users集合
mongoose.model("InventoryLog", InventoryLogSchema);