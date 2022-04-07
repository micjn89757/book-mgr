import {
  post, get
} from '@/helpers/request';

export const list = (page, size) => {
  return get('/forget-password/list', {
    page,
    size,
  });
};

export const add = (account) => {
  return post('/forget-password/add', {
    account,
  });
};

export const updateStatus = (id, status) => {
  return post('/forget-password/update/status', {
    id,
    status,
  });
};

