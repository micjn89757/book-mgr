import axios from 'axios';

export const add = (form) => {
  //返回的是一个promise
  return axios.post('http://localhost:3000/book/add', form)
}

export const list = (data) => {
  return axios.get('http://localhost:3000/book/list', {
    params: data
  })
}

export const del = (id) => {
  return axios.delete(`http://localhost:3000/book/${id}`,);
}

// 库存
export const updateCount = (data = {}) => {
  return axios.post(`http://localhost:3000/book/update/count`, data);
}

// 修改书籍
export const update = (data = {}) => {
  return axios.post('http://localhost:3000/book/update', data);
}
