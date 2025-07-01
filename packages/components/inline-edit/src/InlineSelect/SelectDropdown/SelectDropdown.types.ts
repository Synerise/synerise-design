import type { CSSProperties } from 'react';

import type { ListItemProps } from '@synerise/ds-list-item';

import type { InlineSelectProps } from '../InlineSelect.types';

export type SelectDropdownProps<
  ItemType extends ListItemProps = ListItemProps,
> = Pick<InlineSelectProps<ItemType>, 'dataSource'> & {
  dropdownVisibleRows?: number;
  dropdownRowHeight?: number;
  onSelect: (item: ItemType) => void;
  closeDropdown: () => void;
  style?: CSSProperties;
};

// @deprecated
export type Props = SelectDropdownProps;
