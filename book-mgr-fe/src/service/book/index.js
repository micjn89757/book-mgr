import {
  dele, post, get
} from '@/helpers/request';

// 添加数据
export const add = (data) => {
  //返回的是一个promise
  return post('/book/add', data)
}

// 列表
export const list = (data) => {
  return get('/book/list', data)
}

// 删除数据
export const del = (id) => {
  return dele(`/book/${id}`);
}

// 库存
export const updateCount = (data = {}) => {
  return post(`/book/update/count`, data);
}

// 修改书籍
export const update = (data = {}) => {
  return post('/book/update', data);
}

// 获取一本书的详细信息
export const detail = (id) => {
  return get(`/book/detail/${id}`);
}

// 批量添加
export const addMany = (key) => {
  return post('/book/addMany', {
    key,
  });
};

