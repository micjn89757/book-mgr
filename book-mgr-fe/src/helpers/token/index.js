const TOKEN_STORAGE_KEY = '_tt'; // 设置Token使用的键

// 从localStorage中获取token
export const getToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY) || '';
}

// 设置token
export const setToken = (token) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  return token;
}

// 删除token
export const delToken = () => {
  return localStorage.removeItem(TOKEN_STORAGE_KEY);
}