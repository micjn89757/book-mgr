const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils')
const config = require('../../project.config.js')
const { loadExcel, getFirstSheet } = require('../../helpers/excel');

const BOOK_COUNT = {
  IN: 1, //  代表入库
  OUT: 2 //  代表出库
}

const findBookOne = async(id) => {
  const one = await Book.findOne({
    _id:id
  }).exec();

  return one;
}

const Book = mongoose.model('Book');
const InventoryLog = mongoose.model('InventoryLog');

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
    classify,
    count
  } = getBody(ctx);

  const book = new Book({
    name,
    price,
    author,
    publishDate,
    classify,
    count
  });

  const res = await book.save();

  // 入库记录日志
  const log = new InventoryLog({
    type: 1,
    count
  })

  log.save();

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

  // console.log(page);
  
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
  const list = await Book.find(query).sort({
    _id: -1 // 通过id排序，根据时间倒序排列
  }).skip((page - 1) * size).limit(size).exec();

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

// 删除书籍
router.delete('/:id', async (ctx) => {
  const {
    id   // 拿到删除书籍的id
  } = ctx.params;

  // 删除书籍并返回信息
  const delMsg = await Book.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: delMsg,
    msg: "删除成功",
    code: 1
  };
});

// 更新修改库存
router.post('/update/count', async (ctx) => {
  const {
    id,
    type // 出库还是入库操作
  } = ctx.request.body;

  let { num } = ctx.request.body; 

  // console.log(id, type, num);

  num = Number(num);

  const book = await findBookOne(id);

  if(!book) {
    ctx.body = {
      code: 0,
      msg: '没有找到书籍'
    }
    return;
  }

  // 若找到书
  if(type === BOOK_COUNT.IN) {
    // 入库操作
    num = Math.abs(num);
  }else {
    // 出库操作
    num = -Math.abs(num);
  }

  book.count += num;

  if( book.count < 0 ) {
    ctx.body = {
      code: 0,
      msg: '剩下的量不足以出库'
    };
    return;
  }

  const res = await book.save();

  // 将出库入库信息记入日志
  const log = new InventoryLog({
    num,
    type // 1入库，2出库
  });

  log.save(); // 保存到数据库


  ctx.body = {
    data: res,
    code: 1,
    msg: '操作成功'
  }
})

// 书籍信息修改
router.post('/update', async(ctx) => {
  const {
    id,
    ...others
  } = ctx.request.body;

  // 先找到书籍
  const book = await findBookOne(id);

  // 没有找到书
  if(!book) {
    ctx.body = {
      msg: '没有找到书籍',
      code: 0
    }
    return;
  }

  //存放新的需要修改的数据
  const newQuery = {};
  // 返回一个数组，数组每个成员又是数组，成员数组第一个成员是key，第二个成员是value
  Object.entries(others).forEach(([key, value]) => {
    if(value) {
      newQuery[key] = value;
    }
  });

  // 合并
  Object.assign(book, newQuery);

  const res = await book.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: '修改成功'
  }
})

// 书籍详情页获取书籍信息
router.get('/detail/:id', async(ctx) => {
  const {
    id,
  } = ctx.params;

  const book = await findBookOne(id);

  // 没有找到书
  if(!book) {
    ctx.body = {
      msg: '没有找到书籍',
      code: 0
    }
    return;
  }

  ctx.body = {
    msg: '查询成功',
    data: book,
    code: 1
  }
})

router.post('/addMany', async (ctx) => {
  const {
    key = '',
  } = ctx.request.body;

  const path = `${config.UPLOAD_DIR}/${key}`;

  const excel = loadExcel(path);

  const sheet = getFirstSheet(excel);

  const arr = [];
  for (let i = 0; i < sheet.length; i++) {
    let record = sheet[i];

    const [
      name,
      price,
      author,
      publishDate,
      classify,
      count,
    ] = record;
    

    arr.push({
      name,
      price,
      author,
      publishDate,
      classify: classify.split(','),
      count,
    });
  }

  await Book.insertMany(arr);

  ctx.body = {
    code: 1,
    msg: '添加成功',
    data: {
      addCount: arr.length,
    },
  };
});

module.exports = router;