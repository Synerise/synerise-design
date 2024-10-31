import { ReactNode } from 'react';
import * as S from './Item.styles';

export type ItemProps = {
  active?: boolean;
  children?: ReactNode;
};
export type SubComponents = { Action: typeof S.ItemAction };
