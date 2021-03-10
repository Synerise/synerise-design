import * as React from 'react';
import { ItemProps } from './Item/Item.types';

export enum ExpansionBehaviour {
  DEFAULT = 'default',
  ACCORDION = 'accordion',
  CUSTOM = 'custom',
}

export enum ListType {
  DEFAULT = 'default',
  CONTENT = 'content',
  FILTER = 'filter',
}

export interface ManageableListProps<T extends object> {
  className?: string;
  maxToShowItems: number;
  onItemAdd?: (addParams?: { name: string }) => void;
  onItemRemove?: (removeParams: { id: React.ReactText }) => void;
  onItemEdit?: (editParams: { id: React.ReactText; name: string }) => void;
  onItemSelect: (selectParams: { id: React.ReactText }) => void;
  onItemDuplicate?: (duplicateParams: { id: React.ReactText }) => void;
  onChangeOrder?: (newOrder: ItemProps<T>[]) => void;
  items: ItemProps<T>[];
  loading: boolean;
  type?: string;
  addButtonDisabled?: boolean;
  changeOrderDisabled?: boolean;
  greyBackground?: boolean;
  placeholder?: string;
  selectedItemId?: string;
  searchQuery?: string;
  expanderDisabled?: boolean;
  onExpand?: (id: React.ReactText, isExpanded: boolean) => void;
  texts: Texts;
  expansionBehaviour?: string;
  expandedIds?: React.ReactText[];
  changeOrderByButtons?: boolean;
}
export type Texts = {
  addItemLabel?: string | React.ReactNode;
  showMoreLabel?: string | React.ReactNode;
  showLessLabel?: string | React.ReactNode;
  more?: string | React.ReactNode;
  less?: string | React.ReactNode;
  activateItemTitle?: string | React.ReactNode;
  activate?: string | React.ReactNode;
  cancel?: string | React.ReactNode;
  deleteConfirmationTitle?: string | React.ReactNode;
  deleteConfirmationDescription?: string | React.ReactNode;
  deleteConfirmationYes?: string | React.ReactNode;
  deleteConfirmationNo?: string | React.ReactNode;
  itemActionRename?: string | React.ReactNode;
  itemActionRenameTooltip?: string | React.ReactNode;
  itemActionDuplicate?: string | React.ReactNode;
  itemActionDuplicateTooltip?: string | React.ReactNode;
  itemActionDelete?: string | React.ReactNode;
  itemActionDeleteTooltip?: string | React.ReactNode;
};
