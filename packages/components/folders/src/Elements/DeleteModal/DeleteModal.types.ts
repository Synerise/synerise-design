import { FolderItem, FolderTexts } from '../../Folders.types';

export type DeleteModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (options: { mode: DeleteMode; destination?: FolderItem }) => void;
  deletedItem: FolderItem | undefined;
  folders: FolderItem[];
  texts: FolderTexts;
};
export type DeleteMode = 'move-to-default' | 'move-to-other' | 'delete-all';
