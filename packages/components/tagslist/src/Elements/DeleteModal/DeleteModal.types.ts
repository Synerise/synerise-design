import { TagsListItem, TagsListTexts } from '../../TagsList.types';

export type DeleteModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (options: { mode: DeleteMode; destination?: TagsListItem }) => void;
  deletedItem: TagsListItem | undefined;
  folders: TagsListItem[];
  texts: TagsListTexts | undefined;
};
export type DeleteMode = 'move-to-default' | 'move-to-other' | 'delete-all';
