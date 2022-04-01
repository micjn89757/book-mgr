import axios from 'axios';

export const register = (account, password, inviteCode) => {
  //返回的是一个promise
  return axios.post('http://localhost:3000/auth/register', {
    account,
    password,
    inviteCode
  })
}

export const login = (account, password) => {
  return axios.post('http://localhost:3000/auth/login', {
    account,
    password
  })
}