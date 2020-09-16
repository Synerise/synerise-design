import * as React from 'react';
import SubMenu from './SubMenu/SubMenu';
import Item from './Item/Item';

export type AppMenuProps = {
  className?: string;
  activeItem: string;
  footer: React.ReactElement;
  children: React.ReactNodeArray;
  top?: number;
};

export type AppMenuSubComponents = { SubMenu: typeof SubMenu; Item: typeof Item };
