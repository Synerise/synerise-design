import * as React from 'react';
import { TextareaAutosize } from '@synerise/ds-subtle-form/dist/Elements/TextArea/TextArea.types';
import { HeaderTexts } from '../Header/Header.types';
import { FolderItem } from '../../SidebarObject.types';

export type OverviewObjectProps = {
  inputObject: {
    id: string;
    [key: string]: string | React.ReactNode;
  } & object;
  contentTags: React.ReactNode;
  folders: FolderItem[];
  parentFolder: FolderItem;
  texts: OverviewTexts;
  textDescription: string;
  onFolderSelect: (item: FolderItem) => void;
  autoSize: TextareaAutosize;
  onDescriptionChange: (value: string) => void;
};
export type OverviewTexts = HeaderTexts & {
  placeholder: string;
  suffixTooltip: string | React.ReactNode;
  search: string;
  folder: string;
};
