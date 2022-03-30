// 这个文件里放一些公用函数

const getMate = () => {
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

module.exports = {
  getMate
}