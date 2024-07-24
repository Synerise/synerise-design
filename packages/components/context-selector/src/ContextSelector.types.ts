import { CSSProperties, ReactNode, ReactText } from 'react';
import { HandledEventsType } from '@synerise/ds-utils';
import { ItemSize } from '@synerise/ds-menu';
import { DropdownProps } from '@synerise/ds-dropdown/dist/Dropdown';
import type { FactorsProps } from '@synerise/ds-factors';
import { InformationCardProps } from '@synerise/ds-information-card';

export type ContextTexts = {
  buttonLabel: string;
  searchPlaceholder: string;
  loadingResults: string;
  noResults: string;
};

export type ContextItem = {
  id: ReactText | null;
  name: string;
  icon: ReactNode;
  customSuffix?: ReactNode;
  description?: ReactNode;
  groupId?: ReactText;
  groupName?: string;
  subGroups?: ContextGroup[];
  useCustomIcon?: boolean;
  subtitle?: string;
  informationCardProps?: Partial<InformationCardProps>;
  renderAdditionalDescription?: () => ReactNode;
};

export type ContextGroup = {
  id: ReactText;
  name: string;
  customSuffix?: ReactNode;
  defaultGroup?: boolean;
  description?: ReactNode;
  icon?: ReactNode;
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
  customTriggerComponent?: ReactNode;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  menuItemHeight?: ItemSize;
  dropdownWrapperStyles?: CSSProperties;
  onClickOutsideEvents?: HandledEventsType[];
  onClickOutside?: () => void;
  onSearch?: (query: string) => void;
  hideSearchField?: boolean;
  onFetchData?: () => void;
  onOpen?: () => void;
  hasMoreItems?: boolean;
  type?: 'default' | 'attribute' | 'event';
  dropdownProps?: Omit<DropdownProps, 'trigger' | 'getPopupContainer' | 'onVisibleChange' | 'visible' | 'overlay'>;
  errorText?: ReactNode | string;
  getMenuEntryProps?: FactorsProps['getMenuEntryProps'];
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
  hideSearchField?: boolean;
  loading?: boolean;
  menuItemHeight?: ItemSize;
  dropdownWrapperStyles?: CSSProperties;
  onClickOutsideEvents?: HandledEventsType[];
  onClickOutside?: () => void;
  onSearch?: (query: string) => void;
  onFetchData?: () => void;
  hasMoreItems?: boolean;
  style?: CSSProperties;
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
  style?: CSSProperties;
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
