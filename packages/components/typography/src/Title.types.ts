import type { TitleProps } from 'antd/es/typography/Title';
import type { EllipsisProps } from './Ellipsis';

export type Props = Omit<TitleProps, 'level' | 'ellipsis'> & {
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  withoutMargin?: boolean;
  ellipsis?: EllipsisProps;
};
