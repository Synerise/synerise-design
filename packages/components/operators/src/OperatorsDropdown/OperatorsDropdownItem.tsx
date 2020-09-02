import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import { OperatorsGroup, OperatorsItem } from '../Operator.types';

interface Props {
  item: OperatorsItem | OperatorsGroup;
  searchQuery: string;
  clearSearch?: () => void;
  hideDropdown?: () => void;
  select: (item: OperatorsItem | OperatorsGroup) => void;
}

const OperatorsDropdownItem: React.FC<Props> = ({ item, clearSearch, searchQuery, hideDropdown, select }) => {
  return (
    <Menu.Item
      key={item.name + item.id}
      prefixel={searchQuery && <Icon component={item.icon} />}
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

export default OperatorsDropdownItem;
