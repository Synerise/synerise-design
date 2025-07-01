import { type ListProps } from 'antd/lib/list';
import { type RadioGroupProps } from 'antd/lib/radio';

export type ListPropsType<T> = Omit<ListProps<T>, 'dataSource' | 'footer'> & {
  dataSource: T[] | T[][];
  radio?: boolean;
  options?: RadioGroupProps;
  dashed?: boolean;
};
