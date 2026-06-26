import { type ListProps } from 'antd';

import { type RadioGroupProps } from '@synerise/ds-radio';

export type ListPropsType<T> = Omit<ListProps<T>, 'dataSource' | 'footer'> & {
  dataSource: T[] | T[][];
  radio?: boolean;
  options?: RadioGroupProps;
  dashed?: boolean;
};
