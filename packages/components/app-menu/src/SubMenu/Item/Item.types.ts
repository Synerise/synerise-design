import { type ReactNode } from 'react';

import type * as S from './Item.styles';

export type ItemProps = {
  active?: boolean;
  children?: ReactNode;
};
export type SubComponents = { Action: typeof S.ItemAction };
