import * as React from 'react';

export type ContextTexts = {
  buttonLabel: string;
  searchPlaceholder: string;
  noResults: string;
};

export type ContextItem = {
  name: string;
  icon: React.ReactNode;
  groupId: React.ReactText;
  groupName?: string;
  id: React.ReactText;
  subGroups?: ContextGroup[];
};

export type ContextGroup = {
  defaultGroup?: boolean;
  icon: React.ReactNode;
  id: React.ReactText;
  itemType?: string;
  name: string;
  tooltip?: string;
  subGroups?: ContextGroup[];
};

export type ContextItemsInSubGroup = ContextItem & { isGroup?: boolean };
export type ContextProps = {
  value?: ContextItem | undefined;
  onChange: (item: ContextItem | ContextGroup | undefined) => void;
  groups: ContextGroup[];
  items: ContextItem[];
  texts: ContextTexts;
  opened?: boolean;
  addMode?: boolean;
};

export type ContextDropdownProps = {
  setDropdownVisible: (show: boolean) => void;
  setSelected: (val: ContextItem | ContextGroup) => void;
  groups: ContextGroup[];
  items: ContextItem[];
  texts: ContextTexts;
  value: ContextItem | undefined;
  visible?: boolean;
};
