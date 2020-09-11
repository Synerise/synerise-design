import { FolderItem } from '@synerise/ds-folders/Folders.types';

export type SidebarObjectProps = {
  value?: string;
  avatar: React.ReactNode;
  name: string;
  headerPreffix: React.ReactNode;
  headerTabs: React.ReactNode;
  inputObject: object;
  contentTags: React.ReactNode;
  folders: FolderItem[];
  onEdit: (inputObject: object) => void;
  onDuplicate: (inputObject: object) => void;
  onMove: (inputObject: object) => void;
  onDelete: (inputObject: object) => void;
  onId: (inputObject: object) => void;
  parentFolder: FolderItem;
};
