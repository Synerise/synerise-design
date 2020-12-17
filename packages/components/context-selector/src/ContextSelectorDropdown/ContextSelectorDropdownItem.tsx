import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { CheckS } from '@synerise/ds-icon/dist/icons';
import { ContextGroup, ContextItem } from '../ContextSelector.types';

interface Props {
  item: ContextItem | ContextGroup;
  searchQuery: string;
  clearSearch?: () => void;
  hideDropdown?: () => void;
  select: (item: ContextItem | ContextGroup) => void;
  selected?: boolean;
  className: string;
}

const ContextSelectorDropdownItem: React.FC<Props> = ({
  item,
  clearSearch,
  searchQuery,
  hideDropdown,
  select,
  selected,
  className,
}) => {
  return (
    <Menu.Item
      className={className}
      key={item.name + item.id}
      prefixel={<Icon component={item.icon} />}
      highlight={searchQuery}
      suffixel={selected && <Icon component={<CheckS />} color={theme.palette['green-600']} />}
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

export default ContextSelectorDropdownItem;
