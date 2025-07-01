import { type SubtleTextAreaProps } from '@synerise/ds-subtle-form/dist/Elements/TextArea/TextArea.types';

import { type FolderItem } from '../../SidebarObject.types';
import { type OverviewTexts } from '../Overview/Overview.types';

export type ContentProps = {
  descriptionProps?: SubtleTextAreaProps;
  mainContent: React.ReactNode;
  onDescriptionChange?: (value: string) => void;
  onFolderSelect: (item: FolderItem) => void;
  tags: React.ReactNode;
  textDescription: string;
  texts: OverviewTexts;
};
