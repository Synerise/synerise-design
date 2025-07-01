import { type CSSProperties, type ReactNode } from 'react';

import type { ParameterGroup, ParameterItem } from '../../Factors.types';

export type DropdownItem<ItemType extends ParameterItem | ParameterGroup> = {
  item: ItemType;
  searchQuery: string;
  clearSearch?: () => void;
  hideDropdown?: () => void;
  select: (item: ItemType) => void;
  className: string;
  style?: CSSProperties;
  label?: ReactNode;
};

export type DropdownItemProps<ItemType extends ParameterItem | ParameterGroup> =
  ParameterDropdownTitleProps | DropdownItem<ItemType>;

export type ParameterDropdownTitleProps = {
  title?: string;
  type?: string;
};

export type MixedDropdownItemProps =
  | DropdownItemProps<ParameterItem>
  | DropdownItemProps<ParameterGroup>;
