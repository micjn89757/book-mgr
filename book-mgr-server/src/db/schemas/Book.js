const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers.js')
/**
 * 给哪个数据库的哪个集合
 * 添加什么格式的文档
 */


//创建一个集合(Schema)
//Schema 映射了MongoDB下的一个集合，并且他的内容就是集合下文档的构成 
const BookSchema = new mongoose.Schema({
  // 书名
  name: String,
  // 价格
  price: String,
  // 作者
  author: String,
  // 出版日期
  publishDate: String,
  // 分类标签
  classify: Array,
  // 库存
  count:Number,
  
  meta: getMeta()
});

// mongoose每次在保存数据的时候先执行检查
BookSchema.pre('save', preSave);

//Modal 根据Schema生成的一套方法集合(模型)，这套方法用来操作集合和集合下的文档
//默认会在数据库中生成users集合
mongoose.model("Book", BookSchema);