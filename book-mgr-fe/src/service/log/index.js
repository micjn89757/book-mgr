import {
  post, get
} from '@/helpers/request';
export const list = (page, size) => {
  return get('/log/list', {
    page,
    size,
  });
};

export const remove = (id) => {
  return post('/log/delete', {
    id,
  });
};
