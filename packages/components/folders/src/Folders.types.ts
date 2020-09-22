import * as React from 'react';
import { DeleteMode } from './Elements/DeleteModal/DeleteModal.types';

export type FoldersProps = {
  addButtonDisabled?: boolean;
  actionsDisplay: 'inline' | 'dropdown';
  dataSource: FolderItem[];
  folderFilter?: (item: FolderItem) => boolean;
  maxItemsVisible?: number;
  onAdd: (added: FolderItem) => void;
  onDelete: (deleted: FolderItem, options: { mode: DeleteMode; destination?: FolderItem }) => void;
  onEdit: (edited: FolderItem) => void;
  onFavourite: (favourite: FolderItem) => void;
  onSelect: (selected: FolderItem) => void;
  onSettings: (selected?: FolderItem) => void;
  texts: FolderTexts;
  showHideStep?: number;
};

export type FolderItem = {
  id: string;
  name: string;
  favourite?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  canEnterSettings?: boolean;
};

export type FolderTexts = {
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
