import { ReactNode } from 'react';
import { TabItem } from '@synerise/ds-tabs/dist/Tabs.types';
import { InputProps } from '@synerise/ds-inline-edit/dist/InlineEdit.types';
import { HeaderTexts, HeaderType, ButtonVariant } from './Elements/Header/Header.types';

export type SidebarObjectProps = {
  avatar?: ReactNode;
  headerPreffix?: ReactNode;
  additionalNode?: ReactNode;
  headerType?: HeaderType;
  typeButtons?: ButtonVariant;
  headerTabs: (TabItem & { content?: ReactNode })[];
  inputObjectIdKey?: string;
  inputObject: {
    [key: string]: string | ReactNode;
  } & object;
  inlineEditInputProps?: InputProps;
  onEdit?: (inputObject: object) => void;
  onDuplicate?: (inputObject: object) => void;
  onMove?: (inputObject: object) => void;
  onDelete?: (inputObject: object) => void;
  onId?: (inputObject: object) => void;
  texts: Partial<HeaderTexts>;
  onCloseClick?: () => void;
  onCancelClick?: () => void;
  onApplyClick?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  withScrollbar?: boolean;
  handleTabClick?: (index: number) => void;
  footer?: ReactNode;
  name?: string;
  onRename?: (name: string) => void;
  activeTab?: number;
};
export type FolderItem = {
  id: string;
  name: string;
  favourite?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  canEnterSettings?: boolean;
};
