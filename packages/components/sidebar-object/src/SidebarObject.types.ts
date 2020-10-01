import { TabItem } from '@synerise/ds-tabs/dist/Tabs.types';
import * as React from 'react';
import { HeaderTexts } from './Elements/Header/Header.types';

export type SidebarObjectProps = {
  avatar: React.ReactNode;
  headerPreffix: React.ReactNode;
  headerTabs: TabItem[];
  inputObject: {
    id: string;
    [key: string]: string | React.ReactNode;
  } & object;
  contentTags: React.ReactNode;
  folders: FolderItem[];
  onEdit: (inputObject: object) => void;
  onDuplicate: (inputObject: object) => void;
  onMove: (inputObject: object) => void;
  onDelete: (inputObject: object) => void;
  onId: (inputObject: object) => void;
  parentFolder: FolderItem;
  texts: HeaderTexts;
  onCloseClick: () => void;
  textDescription: string;
  onArrowUp: () => void;
  onArrowDown: () => void;
  onFolderSelect: (item: FolderItem) => void;
  onScrollbar: boolean;
  autoSize: {minRows: number; maxRows: number};

};
export type FolderItem = {
  id: string;
  name: string;
  favourite?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  canEnterSettings?: boolean;
};
