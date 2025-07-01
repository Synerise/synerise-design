import { type CSSProperties, type ReactNode } from 'react';

import type Item from './Item/Item';
import type * as S from './SubMenu.styles';

export type SubMenuProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type SubComponents = {
  Title: typeof S.MenuGroupTitle;
  SubTitle: typeof S.MenuGroupSubTitle;
  Item: typeof Item;
};
