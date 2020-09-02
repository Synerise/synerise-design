import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import { ParameterGroup, ParameterItem } from '../../Factors.types';

interface Props {
  item: ParameterItem | ParameterGroup;
  searchQuery: string;
  clearSearch?: () => void;
  hideDropdown?: () => void;
  select: (item: ParameterItem | ParameterGroup) => void;
}

const ParameterDropdownItem: React.FC<Props> = ({ item, clearSearch, searchQuery, hideDropdown, select }) => {
  return (
    <Menu.Item
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
