export const result = (response) => {
  const { data } = response;

  // if(( data.code === 0 ) && authShowErrorMsg) {
  //   ElMessage({
  //     type: "error",
  //     message: data.msg,
  //     showClose: true
  //   })
  // }

  return {
    // 成功时候do sth
    success(cb) {
        if(data.code !== 0) {
          cb(data, response);
        }

        return this;
    },
    // 失败时候do sth
    fail(cb) {
      if(data.code === 0) {
        cb(data, response);
      }

      return this;
    },
    // 最后不管成功还是失败do sth
    finally(cb) {
      cb(data, response);

      return this;
    }
  }
}