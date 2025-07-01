import React from 'react';

import Item from './Item/Item';
import * as S from './SubMenu.styles';
import { type SubComponents, type SubMenuProps } from './SubMenu.types';
import SubMenuContext from './SubMenuContext/SubMenuContext';

const SubMenu: React.FC<SubMenuProps> & SubComponents = ({
  children,
  className,
  style,
}) => {
  const subMenuContext = React.useContext(SubMenuContext);

  if (!subMenuContext) {
    throw new Error('Cannot use SubMenu outside SubMenuContext');
  }

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
