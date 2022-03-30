// async-await
// const fn = async () => {

// };

// const fn = async function () { 

// };


// Promise

// 回调函数
// const request = (arg, cb) => {
//   setTimeout(() => {
//     console.log(arg);
//     cb(arg + 1);
//   }, 300);
// }

// request(1, function(res1) {
//   request(res1, function(res2) {
//     request(res2, function(res3) {
//       //回调地狱
//     })
//   })
// })

// Promise
const request = (arg, isReject) => {
  //resolve表示成功的时候要做的事情,reject表示失败的时候要做的事情
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(isReject) {
        reject("出错啦");
        return;
      }
      console.log(arg);
      resolve( arg + 1 );
    }, 300);
  })
}

//resolve触发then，reject触发catch
request(1).then((res1) => {
  return request(res1, true);
}).catch((res2) => {
  console.log(res2);
})

request(1).then((res1) => {
  return request(res1);
}).then((res2) => {
  return request(res2);
}).then((res3) => {
  return request(res3);
}).then((res4) => {
  return request(res4);
}).then((res5) => {
  return request(res5);
})


// async 函数返回的就是一个promise
// await必须在async函数中使用，并且后面必须是返回Promise的函数
const fn = async () => {
  const res1 = await request(1);
  const res2 = await request(res1);

  console.log(res2);
};

fn();

