import { FolderItem, FolderTexts } from '../../Folders.types';

export type ActionProps = {
  isFavourite?: boolean;
  dropdownMouseOver?: () => void;
  dropdownMouseOut?: () => void;
  onDelete?: (item?: FolderItem) => void;
  onEdit?: (item?: FolderItem) => void;
  onSettingsEnter?: (item?: FolderItem) => void;
  onFavourite?: (item?: FolderItem) => void;
  texts: FolderTexts;
  hovered?: boolean;
};
