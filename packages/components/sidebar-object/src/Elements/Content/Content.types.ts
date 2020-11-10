import { TextAreaProps } from '@synerise/ds-input/dist/Textarea/Textarea.types';
import { OverviewTexts } from '../Overview/Overview.types';
import { FolderItem } from '../../SidebarObject.types';

export type ContentProps = {
  descriptionTextAreaProps: TextAreaProps;
  mainContent: React.ReactNode;
  onDescriptionChange?: (value: string) => void;
  onFolderSelect: (item: FolderItem) => void;
  tags: React.ReactNode;
  textDescription: string;
  texts: OverviewTexts;
};
