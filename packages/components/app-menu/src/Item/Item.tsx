import React, { type PropsWithChildren, type ReactElement } from 'react';

import Tooltip from '@synerise/ds-tooltip';

import SubMenuContext from '../SubMenu/SubMenuContext/SubMenuContext';
import { useMenu } from '../hooks/useMenu';
import Icon from './Icon/Icon';
import * as S from './Item.styles';

type ItemProps = PropsWithChildren<{
  subMenu?: ReactElement;
  id: string;
  name: string;
  className?: string;
}>;

const Item = ({ children, subMenu, id, name, className }: ItemProps) => {
  const menuContext = useMenu();

  const isActive = menuContext.activeItem === id;
  const isActiveSubMenu = isActive && menuContext.isOpened;

  const handleOpen = () => {
    if (isActive) {
      menuContext.setOpened(!!subMenu && !menuContext.isOpened);
    } else {
      menuContext.setOpened(!!subMenu);
      menuContext.setActiveItem(id);
    }
  };

  return (
    <S.ItemWrapper className={className}>
      <Tooltip
        style={{ marginLeft: '5px' }}
        placement="right"
        title={isActive && menuContext.isOpened ? '' : name}
      >
        <S.ItemLink
          className={`menu__item ${isActive ? 'menu__item--active' : ''}`}
          onClick={handleOpen}
        >
          {children}
        </S.ItemLink>
      </Tooltip>
      {subMenu && id && (
        <SubMenuContext.Provider
          value={{
            id,
            isActive: isActiveSubMenu,
            setOpened: menuContext.setOpened,
          }}
        >
          {subMenu}
        </SubMenuContext.Provider>
      )}
    </S.ItemWrapper>
  );
};

Item.Icon = Icon;

export default Item;
