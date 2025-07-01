import type { Key, ReactNode } from 'react';

import { type CardSelectProps } from '../CardSelect.types';

type CardSelectPropsWithKey = Omit<CardSelectProps, 'key'> & {
  key: Key;
};

export type CardSelectGroupProps = {
  // @deprecated - use items prop instead
  children?: ReactNode;
  className?: string;
  columns?: number | null;
  items?: CardSelectPropsWithKey[];
  size?: CardSelectProps['size'];
  // @depracted - use size instead that drives BOTH items (CardSelect) size and gap size
  width?: 'small' | 'large';
};
