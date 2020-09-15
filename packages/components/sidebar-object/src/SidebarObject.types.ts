import { TabItem } from '@synerise/ds-tabs/dist/Tabs';
import { HeaderTexts } from './Elements/Header/Header.types';

export type SidebarObjectProps = {
  avatar: React.ReactNode;
  headerPreffix: React.ReactNode;
  headerTabs: TabItem[];
  inputObject: object;
  contentTags: React.ReactNode;
  folders: FolderItem[];
  onEdit: (inputObject: object) => void;
  onDuplicate: (inputObject: object) => void;
  onMove: (inputObject: object) => void;
  onDelete: (inputObject: object) => void;
  onId: (inputObject: object) => void;
  parentFolder: FolderItem;
  texts: HeaderTexts;
  onCloseClick: () => void;
  inputObjectId: string;
};
export type FolderItem = {
  id: string;
  name: string;
  favourite?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  canEnterSettings?: boolean;
};
