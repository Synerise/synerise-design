import * as React from 'react';
import Icon, { CheckS } from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

import { ContextItem, ContextSelectorDropdownItemProps } from '../ContextSelector.types';

const ContextSelectorDropdownItem: React.FC<ContextSelectorDropdownItemProps> = ({
  item,
  clearSearch,
  searchQuery,
  hideDropdown,
  select,
  selected,
  className,
  menuItemHeight,
  style,
}) => {
  return (
    <Menu.Item
      style={style}
      className={className}
      key={item.name + item.id}
      prefixel={item.useCustomIcon ? item.icon : <Icon component={item.icon} />}
      highlight={searchQuery}
      suffixel={
        item?.customSuffix
          ? item.customSuffix
          : selected && <Icon component={<CheckS />} color={theme.palette['green-600']} />
      }
      onClick={(): void => {
        clearSearch && clearSearch();
        hideDropdown && hideDropdown();
        select && select(item);
      }}
      size={menuItemHeight}
      description={item.description}
      {...((item as ContextItem).tooltipProps && (item as any).isGroup
        ? {}
        : ({
            popoverProps: (item as ContextItem).popoverProps,
            renderInformationCard: (item as ContextItem).renderInformationCard,
          } as MenuItemProps))}
    >
      {item.name}
    </Menu.Item>
  );
};

export default ContextSelectorDropdownItem;
