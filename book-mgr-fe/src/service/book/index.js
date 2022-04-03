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

