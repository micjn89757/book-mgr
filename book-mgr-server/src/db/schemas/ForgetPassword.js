const mongoose = require('mongoose');
const { getMeta, preSave } = require('../helpers');

const ForgetPasswordSchema = new mongoose.Schema({
  account: String,

  // 1 等待处理, 待处理显示在列表中
  // 2 已经重制
  // 3 忽略
  status: Number,

  meta: getMeta(),
});

ForgetPasswordSchema.pre('save', preSave);

mongoose.model('ForgetPassword', ForgetPasswordSchema);
