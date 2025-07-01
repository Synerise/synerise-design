import React from 'react';

import { theme } from '@synerise/ds-core';
import Icon, { CheckS } from '@synerise/ds-icon';
import ListItem from '@synerise/ds-list-item';

import { type ContextSelectorDropdownItemProps } from '../ContextSelector.types';

const ContextSelectorDropdownItem = ({
  item,
  clearSearch,
  searchQuery,
  hideDropdown,
  select,
  selected,
  className,
  menuItemHeight,
  style,
  label,
}: ContextSelectorDropdownItemProps) => {
  const { id, icon: _, ...itemProps } = item;
  return (
    <ListItem
      style={style}
      className={className}
      key={item.name + item.id}
      prefixel={item.useCustomIcon ? item.icon : <Icon component={item.icon} />}
      highlight={searchQuery}
      suffixel={
        item?.customSuffix
          ? item.customSuffix
          : selected && (
              <Icon component={<CheckS />} color={theme.palette['green-600']} />
            )
      }
      onClick={() => {
        clearSearch && clearSearch();
        hideDropdown && hideDropdown();
        select && select(item);
      }}
      size={menuItemHeight}
      description={item.description}
      {...itemProps}
    >
      {label || item.name}
    </ListItem>
  );
};

export default ContextSelectorDropdownItem;
