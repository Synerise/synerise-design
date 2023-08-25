import { ReactNode } from 'react';
import { SubtleTextAreaProps } from '@synerise/ds-subtle-form/dist/Elements/TextArea/TextArea.types';
import { HeaderTexts } from '../Header/Header.types';
import { FolderItem } from '../../SidebarObject.types';

export type OverviewObjectProps = {
  inputObject: {
    [key: string]: string | ReactNode;
  } & object;
  contentTags: ReactNode;
  descriptionProps?: SubtleTextAreaProps;
  folders: FolderItem[];
  foldersFilterKey?: string;
  foldersDisplayKey?: string;
  foldersIdKey?: string;
  parentFolder: FolderItem;
  texts: OverviewTexts;
  textDescription: string;
  onFolderSelect: (item: FolderItem) => void;
  onDescriptionChange: (value: string) => void;
  onAddFolderClick?: (folderName: string) => void;
};
export type OverviewTexts = HeaderTexts &
  Partial<{
    placeholder: string;
    suffixTooltip: string | ReactNode;
    search: string;
    folder: string;
    addFolder: string;
  }>;
