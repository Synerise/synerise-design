import { type ListProps, type RadioGroupProps } from 'antd';

export type ListPropsType<T> = Omit<ListProps<T>, 'dataSource' | 'footer'> & {
  dataSource: T[] | T[][];
  radio?: boolean;
  options?: RadioGroupProps;
  dashed?: boolean;
};
