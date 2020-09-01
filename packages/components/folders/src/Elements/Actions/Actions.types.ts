import { FolderProps } from '../Folder/Folder.types';

export type ActionProps = {
  isFavourite?: boolean;
} & Pick<FolderProps, 'onDelete'> &
  Pick<FolderProps, 'onEdit'> &
  Pick<FolderProps, 'onSettingsEnter'> &
  Pick<FolderProps, 'onFavourite'>;
