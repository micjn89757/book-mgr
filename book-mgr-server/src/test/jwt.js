let jwt = require('jsonwebtoken');
// 第二的参数是密钥，用来加密
let token = jwt.sign({ 
  account: "a.cc.com",
  _id: "123"
}, 'shhhh');

console.log(token);

// 一个Token由三个部分组成
// header: 加密的算法 sha256， jwt
// payload 传递的参数，用户真正想拿到的信息
// signature: 签证相关内容

jwt.verify(token, 'shhhh', (err,payload) => {
  console.log(err, payload);
});