import { CSSProperties, ReactNode } from 'react';
import * as S from './SubMenu.styles';
import Item from './Item/Item';

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
