import { FolderItem, FolderTexts } from '../../Folders.types';

export type Props = {
  onItemAdd?: (addParams: FolderItem) => void;
  disabled: boolean;
  texts: FolderTexts;
};
