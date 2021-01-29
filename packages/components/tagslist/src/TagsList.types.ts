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
  loadingItems?: boolean;
  addItemsList?: TagsListItem[];
  addItemsLoading?: boolean;
  maxItemsVisible?: number;
  visibleItemsCount?: number;
  onChange?: (action: TagsListActions, newItems: TagsListItem[], newTargetItem: TagsListItem, originItems: TagsListItem[], originTargetItem: TagsListItem) => void;
  onAdd?: (added: TagsListItem) => void;
  onDelete?: (deleted: TagsListItem, options: { mode: DeleteMode; destination?: TagsListItem }) => void;
  onEdit?: (edited: TagsListItem) => void;
  onFavourite?: (favourite: TagsListItem) => void;
  onVisibility?: (visibility: TagVisibility, item?: TagsListItem) => void;
  onSelect?: (selected: TagsListItem) => void;
  onSearch?: (query: string) => void;
  onSettings?: (selected?: TagsListItem) => void;
  texts?: TagsListTexts | undefined;
  showHideStep?: number;
  withCheckbox?: boolean;
  withTristateCheckbox?: boolean;
  withVisibility?: boolean;
};

export enum TagVisibility {
  Hide = 'hide',
  Show = 'show',
  ShowIfUsed = 'showfiused',
};

export type TagsListItem = {
  id: string;
  name: string;
  favourite?: boolean;
  checked?: boolean;
  visibility?: TagVisibility;
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
  chooseDestinationFolder?: React.ReactNode;
  delete?: React.ReactNode;
  deleteFolderLabel?: string | React.ReactNode;
  deleteFolderConfirmationMessage?: string | React.ReactNode;
  deleteFolderDescription?: string | React.ReactNode;
  deleteFromFavourites?: string | React.ReactNode;
  deleteAllContent?: string | React.ReactNode;
  edit?: string | React.ReactNode;
  enterSettings?: string | React.ReactNode;
  favourite?: string | React.ReactNode;
  folderNamePlaceholder?: string;
  invalidNameError?: string | React.ReactNode;
  less?: string | React.ReactNode;
  more?: string | React.ReactNode;
  moveToDefault?: string | React.ReactNode;
  moveToOtherFolder?: string | React.ReactNode;
  showLessLabel?: string | React.ReactNode;
  showMoreLabel?: string | React.ReactNode;
  visibilityHide?: string | React.ReactNode;
  visibilityShow?: string | React.ReactNode;
  visibilityShowIfUsed?: string | React.ReactNode;
};
