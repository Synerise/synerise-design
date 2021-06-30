import * as React from 'react';

export type ContextTexts = {
  buttonLabel: string;
  searchPlaceholder: string;
  loadingResults: string;
  noResults: string;
};

export type ContextItem = {
  name: string;
  icon: React.ReactNode;
  groupId?: React.ReactText;
  groupName?: string;
  id: React.ReactText;
  subGroups?: ContextGroup[];
};

export type ContextGroup = {
  defaultGroup?: boolean;
  icon?: React.ReactNode;
  id: React.ReactText;
  itemType?: string;
  name: string;
  tooltip?: string;
  subGroups?: ContextGroup[];
};

export type ContextItemsInSubGroup = ContextItem & { isGroup?: boolean };
export type ContextProps = {
  selectedItem?: ContextItem | undefined;
  onSelectItem: (item: ContextItem | ContextGroup | undefined) => void;
  groups: ContextGroup[];
  items: ContextItem[];
  texts: ContextTexts;
  onSetGroup?: (item: ContextItem | ContextGroup | undefined) => void;
  opened?: boolean;
  addMode?: boolean;
  loading?: boolean;
  customTriggerComponent?: React.ReactNode;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
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
};

export type ContextSelectorDropdownItemProps = {
  item: ContextItem | ContextGroup;
  searchQuery: string;
  clearSearch?: () => void;
  hideDropdown?: () => void;
  select: (item: ContextItem | ContextGroup) => void;
  selected?: boolean;
  className: string;
};
