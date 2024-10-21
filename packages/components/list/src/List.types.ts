import { ListProps } from 'antd/lib/list';
import { RadioGroupProps } from 'antd/lib/radio';

export type ListPropsType<T> = Omit<ListProps<T>, 'dataSource' | 'footer'> & {
  dataSource: T[] | T[][];
  radio?: boolean;
  options?: RadioGroupProps;
  dashed?: boolean;
}
