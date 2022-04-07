import {
  dele, post, get
} from '@/helpers/request';
import { getToken } from '@/helpers/token';

export const list = (page = 1, size = 20, keyword = "") => {
  return get('/user/list', {
    page,
    size,
    keyword
  })
}

export const add = (data) => {
  return post('/user/add', data)
}

export const del = (id) => {
  return dele(`/user/${id}`,);
}

export const resetPassword = (id) => {
  return post("/user/reset/password", {
    id
  })
}

export const editCharacter = (character, userId) => {
  return post("/user/update/character",{
    character,
    userId
  })
}

// 获取用户信息并验证token
export const info = () => {
  return get("/user/info")
}


export const addMany = (key) => {
  return post('/user/addMany', {
    key,
  });
};
