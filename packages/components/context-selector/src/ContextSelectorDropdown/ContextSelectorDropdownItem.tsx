import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { CheckS } from '@synerise/ds-icon';
import { ContextSelectorDropdownItemProps } from '../ContextSelector.types';

const ContextSelectorDropdownItem: React.FC<ContextSelectorDropdownItemProps> = ({
  item,
  clearSearch,
  searchQuery,
  hideDropdown,
  select,
  selected,
  className,
  menuItemHeight
}) => {
  return (
    <Menu.Item
      className={className}
      key={item.name + item.id}
      prefixel={item.useCustomIcon? item.icon : <Icon component={item.icon} />}
      highlight={searchQuery}
      suffixel={item?.customSuffix ? item.customSuffix : selected && <Icon component={<CheckS />} color={theme.palette['green-600']} />}
      onClick={(): void => {
        clearSearch && clearSearch();
        hideDropdown && hideDropdown();
        select && select(item);
      }}
      size={menuItemHeight}
      description={item.description}
    >
      {item.name}
    </Menu.Item>
  );
};

export default ContextSelectorDropdownItem;
