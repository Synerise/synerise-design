import * as React from 'react';
import * as S from './SubMenu.styles';
import Item from './Item/Item';

export type SubMenuProps = { className?: string; style?: React.CSSProperties };
export type SubComponents = {
  Title: typeof S.MenuGroupTitle;
  SubTitle: typeof S.MenuGroupSubTitle;
  Item: typeof Item;
};
