import {
  dele, post, get
} from '@/helpers/request';

export const list = (page, size) => {
  return get('/invite/list', {
    page,
    size,
  });
};

export const add = (count) => {
  return post('/invite/add', {
    count,
  });
};

export const remove = (id) => {
  return dele(`/invite/${id}`);
};
