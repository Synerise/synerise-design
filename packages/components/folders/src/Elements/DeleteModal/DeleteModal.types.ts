import { FolderItem } from '../../Folders.types';

export type DeleteModalProps = {
  visible: boolean;
  onClose: () => void;
  deletedItem: FolderItem | undefined;
  folders: FolderItem[];
};
export type DeleteMode = 'move-to-default' | 'move-to-other' | 'delete-all';
