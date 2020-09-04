import { FolderItem, FoldersProps, FolderTexts } from '../../Folders.types';

export type FolderProps = {
  id: string;
  name: string;
  toggleDeleteModal?: () => void;
  favourite?: boolean;
  onEdit?: (item: FolderItem) => void;
  onDelete?: (item: FolderItem) => void;
  onFavourite?: (item: FolderItem) => void;
  onSettingsEnter?: (item?: FolderItem) => void;
  onItemSelect?: (item: FolderItem) => void;
  texts: FolderTexts;
} & Pick<FoldersProps, 'actionsDisplay'>;
