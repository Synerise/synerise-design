import React from 'react';

import '@synerise/ds-core/dist/js/style';

import { MenuDivider } from '../../Menu.styles';
import { type MenuDividerProps } from '../../Menu.types';
import SubMenuItem from '../SubMenu/SubMenu';
import { type SubMenuProps } from '../SubMenu/SubMenu.types';
import Danger from './Danger/Danger';
import { ItemType, type MenuItemProps } from './MenuItem.types';
import Select from './Select/Select';
import Text from './Text/Text';

const MenuItem = ({
  prefixel,
  suffixel,
  ordered,
  disabled,
  danger,
  text,
  description,
  subMenu,
  children,
  type,
  indentLevel,
  timeToHideTooltip,
  onClick,
  menuItemKey,
  onTitleClick,
  ...rest
}: SubMenuProps & MenuItemProps & MenuDividerProps) => {
  if (subMenu) {
    return (
      <SubMenuItem
        prefixel={prefixel}
        suffixel={suffixel}
        ordered={ordered}
        disabled={disabled}
        danger={danger}
        text={text}
        description={description}
        indentLevel={indentLevel || 0}
        subMenu={subMenu}
        onClick={(menuInfo): void => {
          menuInfo.domEvent.stopPropagation();
          onClick && onClick(menuInfo);
        }}
        menuItemKey={menuItemKey}
        onTitleClick={onTitleClick}
        {...rest}
      />
    );
  }
  switch (type) {
    case ItemType.SELECT:
      return (
        <Select
          ordered={ordered}
          prefixel={prefixel}
          suffixel={suffixel}
          disabled={disabled}
          description={description}
          indentLevel={indentLevel || 0}
          onClick={(menuInfo) => {
            menuInfo.domEvent.stopPropagation();
            onClick && onClick(menuInfo);
          }}
          {...rest}
        >
          {text || children}
        </Select>
      );
    case ItemType.DANGER:
      return (
        <Danger
          ordered={ordered}
          prefixel={prefixel}
          suffixel={suffixel}
          disabled={disabled}
          description={description}
          indentLevel={indentLevel || 0}
          onClick={(menuInfo) => {
            menuInfo.domEvent.stopPropagation();
            onClick && onClick(menuInfo);
          }}
          {...rest}
        >
          {text || children}
        </Danger>
      );
    case ItemType.DIVIDER:
      return <MenuDivider level={rest.level} />;
    default:
      return (
        <Text
          ordered={ordered}
          prefixel={prefixel}
          suffixel={suffixel}
          disabled={disabled}
          danger={danger}
          description={description}
          timeToHideTooltip={timeToHideTooltip}
          indentLevel={indentLevel || 0}
          onClick={(menuInfo) => {
            menuInfo.domEvent.stopPropagation();
            onClick && onClick(menuInfo);
          }}
          {...rest}
        >
          {text || children}
        </Text>
      );
  }
};

export default MenuItem;
