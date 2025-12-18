import React from 'react';

import { useSubMenu } from '../hooks/useSubMenu';
import Item from './Item/Item';
import * as S from './SubMenu.styles';
import { type SubComponents, type SubMenuProps } from './SubMenu.types';

const SubMenu: React.FC<SubMenuProps> & SubComponents = ({
  children,
  className,
  style,
}) => {
  const subMenuContext = useSubMenu();

  return (
    <S.MenuGroupWrapper
      className={`menu__sub-menu ${className || ''} ${subMenuContext.isActive ? 'menu__sub-menu--active' : ''}`}
      style={style}
    >
      {children}
    </S.MenuGroupWrapper>
  );
};

SubMenu.Title = S.MenuGroupTitle;
SubMenu.SubTitle = S.MenuGroupSubTitle;
SubMenu.Item = Item;

export default SubMenu;
