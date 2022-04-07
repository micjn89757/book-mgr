const xlsx = require('node-xlsx');

// excel转化成对象
const loadExcel = (path) => {
  return xlsx.parse(path);
};

// 获取第一个表的数据
const getFirstSheet = (sheets) => {
  return sheets[0].data;
};

module.exports = {
  loadExcel,
  getFirstSheet,
};

// 选择一个文件上传
// 服务端得到文件返回key
// 前端请求对应业务