// 此文件用于将一些需要提前加入数据库的进行脚本运行一次性添加

const mongoose = require('mongoose');
const { connect } = require('../src/db/index');
const character = require('../src/helpers/character');


const Character = mongoose.model('Character');
const { defaultCharacters } = character;

// 数据库连接后插入数据
connect().then(async() => {
  console.log("开始初始化 角色 集合");

  await Character.insertMany
  (defaultCharacters);

  console.log("初始化脚本完成");
})
