import { post } from '@/helpers/request';


export const register = (account, password, inviteCode) => {
  //返回的是一个promise
  return post('/auth/register', {
    account,
    password,
    inviteCode
  })
}

export const login = (account, password) => {
  return post('/auth/login', {
    account,
    password
  })
}