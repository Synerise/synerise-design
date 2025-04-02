import type { CSSProperties, ReactNode, ReactText } from 'react';
import type { HandledEventsType } from '@synerise/ds-utils';
import type { DropdownProps } from '@synerise/ds-dropdown';
import type { FactorsProps } from '@synerise/ds-factors';
import type { InformationCardProps } from '@synerise/ds-information-card';
import type { ListItemProps, ItemSize } from '@synerise/ds-list-item';

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

export type ContextItem = Pick<ListItemProps, 'renderHoverTooltip' | 'hoverTooltipProps' | 'disabled'> & {
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
  errorText?: ReactNode;
  isError?: boolean;
  getMenuEntryProps?: FactorsProps['getMenuEntryProps'];
  dropdownDimensionsConfig?: {
    defaultHeight?: number;
    lowerHeight?: number;
    threshold?: number;
  };
};

export type ContextDropdownProps = {
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
