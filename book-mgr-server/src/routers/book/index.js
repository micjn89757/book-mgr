const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils')

const Book = mongoose.model('Book');

const router = new Router({
  prefix: '/book',
});

// 添加书籍
router.post('/add', async (ctx) => {
  const {
    name,
    price,
    author,
    publishDate,
    classify
  } = getBody(ctx);

  const book = new Book({
    name,
    price,
    author,
    publishDate,
    classify
  });

  const res = await book.save();

  ctx.body = {
    code: 1,
    data: res,
    msg: '添加成功'
  }
});

// 获取书籍列表
router.get('/list', async (ctx) => {
  // https://aa.cc.com/user?page=1&size=20
  const {
    page = 1,
    size = 3,
    keyword = ''
  } = ctx.query; // 获取参数

  // console.log(typeof size)
  
  // Book这个集合下有多少文档
  let total = await Book.countDocuments();

  // console.log(keyword)

  // 这里防止传入find参数是空字符串而导致没有数据返回
  // 空字符串也会匹配
  const query = {};
  if(keyword) {
    query.name = keyword;
  }

  // console.log(query)
  // (page - 1) * size 就是要跳过的文档数，skit就是跳过多少条, limit就是限制数量
  // list是当前页的记录
  const list = await Book.find(query).skip((page - 1) * size).limit(size).exec();

  // console.log(list.length); 
  if(keyword) {
    total = list.length
  }
  

  ctx.body = {
    data: { total, list, page, size },
    code: 1,
    msg: "获取列表成功"
  }
})

module.exports = router;