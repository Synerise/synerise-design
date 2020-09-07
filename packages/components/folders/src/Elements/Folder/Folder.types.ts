import { FolderItem, FoldersProps, FolderTexts } from '../../Folders.types';

export type FolderProps = {
  item: FolderItem;
  toggleDeleteModal?: () => void;
  onEdit?: (item: FolderItem) => void;
  onDelete?: (item: FolderItem) => void;
  onFavourite?: (item: FolderItem) => void;
  onSettingsEnter?: (item?: FolderItem) => void;
  onItemSelect?: (item: FolderItem) => void;
  texts: FolderTexts;
} & Pick<FoldersProps, 'actionsDisplay'>;
