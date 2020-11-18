import { SubtleTextAreaProps } from '@synerise/ds-subtle-form/dist/Elements/TextArea/TextArea.types';
import { OverviewTexts } from '../Overview/Overview.types';
import { FolderItem } from '../../SidebarObject.types';

export type ContentProps = {
  descriptionProps?: SubtleTextAreaProps;
  mainContent: React.ReactNode;
  onDescriptionChange?: (value: string) => void;
  onFolderSelect: (item: FolderItem) => void;
  tags: React.ReactNode;
  textDescription: string;
  texts: OverviewTexts;
};
