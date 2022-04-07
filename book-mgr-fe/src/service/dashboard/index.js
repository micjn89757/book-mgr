import {
  get
} from '@/helpers/request';

export const baseInfo = () => {
  return get('/dashboard/base-info');
};
