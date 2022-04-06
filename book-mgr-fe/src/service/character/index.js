import {
  get
} from '@/helpers/request';


export const list = () => {
  return get('/character/list')
}


