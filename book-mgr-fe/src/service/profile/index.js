import {
  post
} from '@/helpers/request';

export const resetPassword = (password, oldPassword) => {
  return post('/profile/update/password', {
    password,
    oldPassword,
  })
};
