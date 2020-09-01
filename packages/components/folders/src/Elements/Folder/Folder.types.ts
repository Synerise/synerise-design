import { FolderItem, FoldersProps } from '../../Folders.types';

export type FolderProps = {
  id: string;
  name: string;
  favourite?: boolean;
  onEdit?: (item: FolderItem) => void;
  onDelete?: (item: FolderItem) => void;
  onFavourite?: (item: FolderItem) => void;
  onSettingsEnter?: (item: FolderItem) => void;
} & Pick<FoldersProps, 'actionsDisplay'>;
