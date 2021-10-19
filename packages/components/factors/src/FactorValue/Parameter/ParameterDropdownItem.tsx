import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import { ParameterGroup, ParameterItem } from '../../Factors.types';

export type DropdownItem = {
  item: ParameterItem | ParameterGroup;
  searchQuery: string;
  clearSearch?: () => void;
  hideDropdown?: () => void;
  select: (item: ParameterItem | ParameterGroup) => void;
  className: string;
  style?: React.CSSProperties;
};

const ParameterDropdownItem: React.FC<DropdownItem> = ({
  item,
  clearSearch,
  searchQuery,
  hideDropdown,
  select,
  className,
  style,
}) => {
  return (
    <Menu.Item
      style={style}
      className={className}
      key={item.name + item.id}
      prefixel={<Icon component={item.icon} />}
      highlight={searchQuery}
      onClick={(): void => {
        clearSearch && clearSearch();
        hideDropdown && hideDropdown();
        select && select(item);
      }}
    >
      {item.name}
    </Menu.Item>
  );
};

export default ParameterDropdownItem;
