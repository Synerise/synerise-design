import React, { CSSProperties } from 'react';
import Icon from '@synerise/ds-icon';
import ListItem from '@synerise/ds-list-item';
import { ParameterGroup, ParameterItem } from '../../Factors.types';

export type DropdownItem = {
  item: ParameterItem | ParameterGroup;
  searchQuery: string;
  clearSearch?: () => void;
  hideDropdown?: () => void;
  select: (item: ParameterItem | ParameterGroup) => void;
  className: string;
  style?: CSSProperties;
};

const ParameterDropdownItem = ({
  item,
  clearSearch,
  searchQuery,
  hideDropdown,
  select,
  className,
  style,
}: DropdownItem) => {
  const { id, icon: _, ...itemProps } = item;
  return (
    <ListItem
      {...itemProps}
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
    </ListItem>
  );
};

export default ParameterDropdownItem;
