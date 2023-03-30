import * as React from 'react';
import { CSSProperties } from 'react';
import { HandledEventsType } from '@synerise/ds-utils';
import { ItemSize } from '@synerise/ds-menu';
import { DropdownProps } from '@synerise/ds-dropdown/dist/Dropdown';

export type ContextTexts = {
  buttonLabel: string;
  searchPlaceholder: string;
  loadingResults: string;
  noResults: string;
};

export type ContextItem = {
  id: React.ReactText;
  name: string;
  icon: React.ReactNode;
  customSuffix?: React.ReactNode;
  description?: React.ReactNode;
  groupId?: React.ReactText;
  groupName?: string;
  subGroups?: ContextGroup[];
  useCustomIcon?: boolean;
  subtitle?: string;
};

export type ContextGroup = {
  id: React.ReactText;
  name: string;
  customSuffix?: React.ReactNode;
  defaultGroup?: boolean;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  itemType?: string;
  tooltip?: string;
  subGroups?: ContextGroup[];
  useCustomIcon?: boolean;
};

export type ContextItemsInSubGroup = ContextItem & { isGroup?: boolean };
export type ContextProps = {
  disabled?: boolean;
  readOnly?: boolean;
  defaultDropdownVisibility?: boolean;
  selectedItem?: ContextItem | undefined;
  onActivate?: (fieldType: string) => void;
  onDeactivate?: () => void;
  onSelectItem: (item: ContextItem | ContextGroup | undefined) => void;
  groups: ContextGroup[];
  items: ContextItem[];
  texts: ContextTexts;
  getPopupContainerOverride?: (trigger: HTMLElement | null) => HTMLElement;
  onSetGroup?: (item: ContextItem | ContextGroup | undefined) => void;
  opened?: boolean;
  addMode?: boolean;
  loading?: boolean;
  customTriggerComponent?: React.ReactNode;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  menuItemHeight?: ItemSize;
  dropdownWrapperStyles?: CSSProperties;
  onClickOutsideEvents?: HandledEventsType[];
  onClickOutside?: () => void;
  onSearch?: (query: string) => void;
  onFetchData?: () => void;
  onOpen?: () => void;
  hasMoreItems?: boolean;
  type?: 'default' | 'attribute' | 'event';
  dropdownProps?: Omit<DropdownProps, 'trigger' | 'getPopupContainer' | 'onVisibleChange' | 'visible' | 'overlay'>;
};

export type ContextDropdownProps = {
  setDropdownVisible: (show: boolean) => void;
  setSelected: (val: ContextItem | ContextGroup) => void;
  groups: ContextGroup[];
  items: ContextItem[];
  texts: ContextTexts;
  value: ContextItem | undefined;
  onSetGroup?: (val: ContextItem | ContextGroup) => void;
  visible?: boolean;
  loading?: boolean;
  menuItemHeight?: ItemSize;
  dropdownWrapperStyles?: CSSProperties;
  onClickOutsideEvents?: HandledEventsType[];
  onClickOutside?: () => void;
  onSearch?: (query: string) => void;
  onFetchData?: () => void;
  hasMoreItems?: boolean;
  style?: React.CSSProperties;
};

export type ContextSelectorDropdownItemProps = {
  item: ContextItem | ContextGroup;
  searchQuery: string;
  clearSearch?: () => void;
  hideDropdown?: () => void;
  select: (item: ContextItem | ContextGroup) => void;
  selected?: boolean;
  className: string;
  menuItemHeight?: ItemSize;
  style?: React.CSSProperties;
};

export type ListItem = {
  className: string;
  item: ContextItem | ContextGroup;
  searchQuery: string;
  select: (item: ContextItem | ContextGroup) => void;
  menuItemHeight?: ItemSize;
  selected?: boolean;
  clearSearch?: () => void;
  hideDropdown?: () => void;
};

export type ListTitle = {
  title?: string;
  type?: string;
};

export type DropdownItemProps = ListTitle | ListItem;
