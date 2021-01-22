import * as React from 'react';
import { DeleteMode } from './Elements/DeleteModal/DeleteModal.types';

export type TagsListProps = {
  addButtonDisabled?: boolean;
  actionsDisplay: 'inline' | 'dropdown';
  dataSource: TagsListItem[];
  folderFilter?: (item: TagsListItem) => boolean;
  maxItemsVisible?: number;
  onAdd: (added: TagsListItem) => void;
  onDelete: (deleted: TagsListItem, options: { mode: DeleteMode; destination?: TagsListItem }) => void;
  onEdit: (edited: TagsListItem) => void;
  onFavourite: (favourite: TagsListItem) => void;
  onSelect: (selected: TagsListItem) => void;
  onSettings: (selected?: TagsListItem) => void;
  texts: TagsListTexts;
  showHideStep?: number;
};

export type TagsListItem = {
  id: string;
  name: string;
  favourite?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  canEnterSettings?: boolean;
};

export type TagsListTexts = {
  add: string | React.ReactNode;
  addItemLabel: string | React.ReactNode;
  addToFavourite: string | React.ReactNode;
  cancel: string | React.ReactNode;
  chooseDestinationFolder: string | React.ReactNode;
  delete: string | React.ReactNode;
  deleteFolderLabel: string | React.ReactNode;
  deleteFolderConfirmationMessage: string | React.ReactNode;
  deleteFolderDescription: string | React.ReactNode;
  deleteFromFavourites: string | React.ReactNode;
  deleteAllContent: string | React.ReactNode;
  edit: string | React.ReactNode;
  enterSettings: string | React.ReactNode;
  favourite: string | React.ReactNode;
  folderNamePlaceholder?: string;
  invalidNameError?: string | React.ReactNode;
  less: string | React.ReactNode;
  more: string | React.ReactNode;
  moveToDefault: string | React.ReactNode;
  moveToOtherFolder: string | React.ReactNode;
  showLessLabel: string | React.ReactNode;
  showMoreLabel: string | React.ReactNode;
};
