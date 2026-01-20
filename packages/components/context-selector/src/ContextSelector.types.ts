import type { CSSProperties, ReactNode, ReactText } from 'react';

import type { DropdownSharedProps } from '@synerise/ds-dropdown';
import type { InformationCardProps } from '@synerise/ds-information-card';
import type { ItemSize, ListItemProps } from '@synerise/ds-list-item';
import {
  type DelayConfig,
  type PopoverTriggerType,
} from '@synerise/ds-popover';
import type { HandledEventsType } from '@synerise/ds-utils';

export type ContextTexts = {
  buttonLabel: ReactNode;
  searchPlaceholder: string;
  /**
   * @deprecated - Skeleton is displayed instead
   */
  loadingResults?: string;
  noResults: ReactNode;
  showMore: ReactNode;
  recentItemsGroupName: string;
  allItemsGroupName: string;
};

export type ContextItem = Pick<
  ListItemProps,
  'renderHoverTooltip' | 'popoverProps' | 'disabled'
> & {
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
  value?: ReactText | null;
  excludeFromSearchResults?: boolean;
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

export const isContextItemsInSubGroup = (
  item: ContextGroup | ContextItemsInSubGroup,
): item is ContextItemsInSubGroup => {
  return !!(item as ContextItemsInSubGroup).isGroup;
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
  recentItems?: ContextItem[];
  texts?: Partial<ContextTexts>;
  getPopupContainerOverride?: (trigger: HTMLElement | null) => HTMLElement;
  onSetGroup?: (item: ContextItem | ContextGroup | undefined) => void;
  opened?: boolean;
  addMode?: boolean;
  loading?: boolean;
  customTriggerComponent?: ReactNode;
  trigger?: PopoverTriggerType | PopoverTriggerType[];
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
  dropdownProps?: Omit<
    DropdownSharedProps,
    'trigger' | 'getPopupContainer' | 'overlay' | 'children'
  >;
  errorText?: ReactNode;
  isError?: boolean;
  dropdownDimensionsConfig?: {
    defaultHeight?: number;
    lowerHeight?: number;
    threshold?: number;
  };
  popoverDelay?: DelayConfig;
};

export type ContextDropdownProps = Pick<
  ContextProps,
  'onDeactivate' | 'popoverDelay'
> & {
  setDropdownVisible: (show: boolean) => void;
  setSelected: (val: ContextItem | ContextGroup) => void;
  groups: ContextGroup[];
  items: ContextItem[];
  recentItems?: ContextItem[];
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
  outerHeight?: number;
  maxSearchResultsInGroup?: number;
};

export type ContextSelectorDropdownItemProps = {
  className: string;
  clearSearch?: () => void;
  hideDropdown?: () => void;
  item: ContextItem | ContextGroup;
  menuItemHeight?: ItemSize;
  searchQuery?: string;
  select: (item: ContextItem | ContextGroup) => void;
  selected?: boolean;
  style?: CSSProperties;
  label?: ReactNode;
};

export type ListTitle = {
  title?: string;
  type?: string;
};

export type ListDivider = {
  type: 'divider';
};

export type DropdownItemProps = ListTitle | ContextSelectorDropdownItemProps;
