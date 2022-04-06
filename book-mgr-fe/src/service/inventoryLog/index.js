import {
  get
} from '@/helpers/request';

export const list = (type = 1, page = 1, size = 8) => {
  //返回的是一个promise
  return get('/inventoryLog/list', {
    type,
    page,
    size
  })
}