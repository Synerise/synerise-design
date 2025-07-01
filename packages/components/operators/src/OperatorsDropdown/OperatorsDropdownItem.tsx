import React from 'react';

import { theme } from '@synerise/ds-core';
import Icon, { CheckS } from '@synerise/ds-icon';
import ListItem from '@synerise/ds-list-item';

import { type OperatorsGroup, type OperatorsItem } from '../Operator.types';

type OperatorsDropdownItemProps = {
  item: OperatorsItem | OperatorsGroup;
  searchQuery: string;
  clearSearch?: () => void;
  hideDropdown?: () => void;
  select: (item: OperatorsItem | OperatorsGroup) => void;
  selected?: boolean;
  className: string;
};

const OperatorsDropdownItem = ({
  item,
  clearSearch,
  searchQuery,
  hideDropdown,
  select,
  selected,
  className,
}: OperatorsDropdownItemProps) => {
  return (
    <ListItem
      className={className}
      key={item.name + item.id}
      prefixel={searchQuery && <Icon component={item.icon} />}
      highlight={searchQuery}
      suffixel={
        selected && (
          <Icon component={<CheckS />} color={theme.palette['green-600']} />
        )
      }
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

export default OperatorsDropdownItem;
