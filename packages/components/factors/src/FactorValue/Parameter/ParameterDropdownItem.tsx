import React from 'react';

import Icon from '@synerise/ds-icon';
import ListItem from '@synerise/ds-list-item';

import { type ParameterGroup, type ParameterItem } from '../../Factors.types';
import { type DropdownItem } from './Parameter.types';

const ParameterDropdownItem = <
  ItemType extends ParameterItem | ParameterGroup,
>({
  item,
  clearSearch,
  searchQuery,
  hideDropdown,
  select,
  className,
  style,
  label,
}: DropdownItem<ItemType>) => {
  const { id, icon, ...itemProps } = item;
  return (
    <ListItem
      {...itemProps}
      style={style}
      className={className}
      key={item.name + item.id}
      prefixel={<Icon component={icon} />}
      highlight={searchQuery}
      onClick={(): void => {
        clearSearch && clearSearch();
        hideDropdown && hideDropdown();
        select && select(item);
      }}
    >
      {label || item.name}
    </ListItem>
  );
};

export default ParameterDropdownItem;
