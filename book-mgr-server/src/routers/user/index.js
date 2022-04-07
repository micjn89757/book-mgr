const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils')
const { DEFAULT_PASSWORD }  = require("../../project.config.js");
const { verify, getToken } = require("../../helpers/token")
const { loadExcel, getFirstSheet } = require('../../helpers/excel');
const User = mongoose.model('User');
const Character = mongoose.model('Character');
const config  = require("../../project.config") 

const router = new Router({
  prefix: '/user'
});

// ctx（context）上下文-当前请求的相关信息都在里面
// 获取用户列表
router.get('/list',async (ctx) => {
  const {
    page,
    size,
    keyword
  } = ctx.query;

  const query = {}
  if(keyword) {
    query.account = keyword;
  }


  let total = await User.countDocuments().exec();

  const list = await User.find(query).sort({
    _id: -1
  }).skip((page - 1) * size).limit(size).exec();

  if(keyword) {
    total = list.length
  }

  ctx.body = {
    msg: '获取列表成功',
    data: {
      list,
      page,
      size,
      total
    },
    code: 1
  }
});

// 删除用户
router.delete('/:id', async (ctx)=> {
  const {
    id
  } = ctx.params;

  const delMsg = await User.deleteOne({
    _id:id
  })

  ctx.body = {
    data: delMsg,
    code: 1,
    msg: '删除成功'
  }
})

// 添加用户
router.post('/add', async(ctx) => {
  const {
    account,
    password,
    character
  } = getBody(ctx);

  const char = await Character.findOne({
    _id:character
  })

  if(!char) {
    ctx.body = {
      code: 0,
      msg: '出错啦'
    }

    return;
  }

  const user = new User({
    account,
    password,
    character
  });

  const res = await user.save();

  ctx.body = {
    code: 1,
    msg: "添加成功",
    data: res
  }
})

// 重置密码
router.post('/reset/password', async(ctx)=> {
  const {
    id
  } = getBody(ctx);

  const user = await User.findOne({
    _id: id
  }).exec();

  if(!user) {
    ctx.body = {
      code: 0,
      msg: "没有找到该用户",
    };
    return;
  }

  user.password = DEFAULT_PASSWORD;

  const res = await user.save();

  ctx.body = {
    code: 1,
    msg: "修改成功",
    data:{
      account: res.account,
      _id: res._id
    }
  }
})

// 修改角色
router.post('/update/character', async(ctx) => {
  const {
    character,
    userId // 拿到用户的Id
  } = getBody(ctx);

  // 找到对应角色
  const char = await Character.findOne({
    _id: character
  });

  if(!char) {
    ctx.body = {
      msg: "出错啦",
      code: 0
    }
    return;
  }

  // 找到对应用户
  const user = await User.findOne({
    _id:userId
  })

  if(!user) {
    ctx.body = {
      msg: "出错啦",
      code: 0
    }
    return;
  }

  user.character = character;

  const res = await user.save();

  ctx.body = {
    data: res,
    code: 1,
    msg: '修改成功'
  }
})

// 通过token换取用户信息
router.get('/info', async (ctx) => {
  ctx.body = {
    data: await verify(getToken(ctx)),
    code: 1,
    msg: '获取成功'
  }
})

// 批量上传
router.post('/addMany', async (ctx) => {
  const {
    key = '',
  } = ctx.request.body;

  const path = `${config.UPLOAD_DIR}/${key}`;

  const excel = loadExcel(path);

  const sheet = getFirstSheet(excel);

  // 用户角色
  const character = await Character.find().exec();

  console.log(character);

  const member = character.find((item) => (item.name === 'member'));

  const arr = [];
  for (let i = 0; i < sheet.length; i++) {
    let record = sheet[i];

    const [account, password = config.DEFAULT_PASSWORD] = record;

    const one = await User.findOne({
      account,
    })

    if (one) {
      continue;
    }

    arr.push({
      account,
      password,
      character: member._id,
    });
  }

  await User.insertMany(arr);

  ctx.body = {
    code: 1,
    msg: '添加成功',
    data: {
      addCount: arr.length,
    },
  };
});
module.exports = router;