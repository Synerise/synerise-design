import { type FolderItem } from '../../SidebarObject.types';
import { type HeaderTexts } from '../Header/Header.types';
import { type OverviewTexts } from '../Overview/Overview.types';

export interface Props {
  data: FolderItem[];
  onAddFolderClick?: (folderName: string) => void;
  onClearInput?: () => void;
  parentFolder: FolderItem;
  texts: OverviewTexts & HeaderTexts;
  onDropdownOutsideClick: () => void;
  onSearchChange: (value: string) => void;
  searchValue: string;
  onFolderSelect: (item: FolderItem) => void;
  foldersFilterKey: keyof FolderItem;
  foldersDisplayKey: keyof FolderItem;
  foldersIdKey: keyof FolderItem;
}
