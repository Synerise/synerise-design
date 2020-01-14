import * as React from 'react';

import * as S from './SubMenu.styles';

import Item from './Item/Item';
import SubMenuContext from './SubMenuContext/SubMenuContext';

const SubMenu: React.FC<{ className?: string }> & {
  Title: typeof S.MenuGroupTitle;
  SubTitle: typeof S.MenuGroupSubTitle;
  Item: typeof Item;
} = ({ children, className }) => {
  const subMenuContext = React.useContext(SubMenuContext);

  if (!subMenuContext) {
    throw new Error('Cannot use SubMenu outside SubMenuContext');
  }

  return (
    <S.MenuGroupWrapper
      className={`menu__sub-menu ${className || ''} ${subMenuContext.isActive ? 'menu__sub-menu--active' : ''}`}
    >
      {children}
    </S.MenuGroupWrapper>
  );
};

SubMenu.Title = S.MenuGroupTitle;
SubMenu.SubTitle = S.MenuGroupSubTitle;
SubMenu.Item = Item;

export default SubMenu;
