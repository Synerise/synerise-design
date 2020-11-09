import * as React from 'react';
import { HeaderTexts } from '../Header/Header.types';
import { FolderItem } from '../../SidebarObject.types';

export type OverviewObjectProps = {
  inputObjectIdKey?: string;
  inputObject: {
    [key: string]: string | React.ReactNode;
  } & object;
  contentTags: React.ReactNode;
  folders: FolderItem[];
  foldersFilterKey?: string;
  foldersDisplayKey?: string;
  foldersIdKey?: string;
  parentFolder: FolderItem;
  texts: OverviewTexts;
  textDescription: string;
  onFolderSelect: (item: FolderItem) => void;
  onDescriptionChange: (value: string) => void;
};
export type OverviewTexts = HeaderTexts & {
  placeholder: string;
  suffixTooltip: string | React.ReactNode;
  search: string;
  folder: string;
  addFolder: string;
};
