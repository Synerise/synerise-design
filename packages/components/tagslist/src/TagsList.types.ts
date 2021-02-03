import * as React from 'react';
import { DeleteMode } from './Elements/DeleteModal/DeleteModal.types';

export enum TagsListActions {
  Add = 'add',
  Delete = 'delete',
  Edit = 'edit',
  Favourite = 'favourite',
  Visibility = 'visibility',
  Select = 'select',
}

export type TagsListProps = {
  addButtonDisabled?: boolean;
  items?: TagsListItem[];
  defaultItems?: TagsListItem[];
  loadingItems?: boolean;
  addItemsList?: TagsListItem[];
  addItemsLoading?: boolean;
  maxItemsVisible?: number;
  visibleItemsCount?: number;
  onChange?: (
    action: TagsListActions, 
    newItems: TagsListItem[], 
    newTargetItem: TagsListItem, 
    originItems: TagsListItem[], 
    originTargetItem: TagsListItem
  ) => void;
  onAddDropdown?: (visible: boolean) => void;
  onDelete?: (deleted: TagsListItem, options: { mode: DeleteMode; destination?: TagsListItem }) => void;
  onSearch?: (query: string) => void;
  onSettings?: (selected?: TagsListItem) => void;
  onManageTags?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onItemsAdd?: (items: TagsListItem[]) => void;
  texts?: TagsListTexts | undefined;
  showHideStep?: number;
  withCheckbox?: boolean;
  withTristateCheckbox?: boolean;
  withVisibility?: boolean;
};

export enum TagVisibility {
  Hide = 'hide',
  Show = 'show',
  ShowIfUsed = 'showifused',
};

export type TagsListItem = {
  id: string | number;
  name: string;
  favourite?: boolean;
  checked?: boolean;
  visibility?: TagVisibility;
  description?: string;
  canUpdate?: boolean;
  canDelete?: boolean;
  canEnterSettings?: boolean;
};

export type TagsListTexts = {
  add?: React.ReactNode;
  addItemLabel?: React.ReactNode;
  addToFavourite?: React.ReactNode;
  applyAdd?: React.ReactNode;
  cancel?: React.ReactNode;
  delete?: React.ReactNode;
  deleteFromFavourites?: React.ReactNode;
  deleteAllContent?: React.ReactNode;
  edit?: React.ReactNode;
  enterSettings?: React.ReactNode;
  favourite?: React.ReactNode;
  folderNamePlaceholder?: string;
  invalidNameError?: React.ReactNode;
  less?: React.ReactNode;
  more?: React.ReactNode;
  moveToDefault?: React.ReactNode;
  moveToOtherFolder?: React.ReactNode;
  searchClear?: React.ReactNode;
  showLessLabel?: React.ReactNode;
  showMoreLabel?: React.ReactNode;
  visibilityHide?: React.ReactNode;
  visibilityShow?: React.ReactNode;
  visibilityShowIfUsed?: React.ReactNode;
};
