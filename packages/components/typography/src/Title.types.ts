import { TitleProps } from 'antd/es/typography/Title';

export interface Props extends Omit<TitleProps, 'level'> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}
