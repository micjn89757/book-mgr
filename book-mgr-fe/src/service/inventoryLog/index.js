import axios from 'axios';

export const list = (type = 1, page = 1, size = 8) => {
  //返回的是一个promise
  return axios.get('http://localhost:3000/inventoryLog/list', {
    params: {
      type,
      page,
      size
    }
  })
}