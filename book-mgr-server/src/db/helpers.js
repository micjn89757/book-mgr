// 这个文件里放一些公用函数

const getMeta = () => {
  return {
    //什么时候被创建
    createdAt: {
      type: Number,
      default: (new Date()).getTime(),
    },
    //什么时候更新
    updateAt: {
      type: Number,
      default: (new Date()).getTime(),
    }
  }
}

// 保存前的动作，针对日期
const preSave = function (next) {
  const ts = Date.now();
  // 判断当前数据是否是最新的
  if(this.isNew) {
    // 使用时间戳更新数据
    this['meta'].createdAt = ts;
    this['meta'].updateAt = ts;
  }else {
    // 访问就更新更新日期
    this['meta'].updateAt = ts;
  }

  next(); // 告知mongoose继续执行
}

module.exports = {
  getMeta,
  preSave
}