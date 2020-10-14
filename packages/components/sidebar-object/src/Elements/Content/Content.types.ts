import { TextareaAutosize } from '@synerise/ds-subtle-form/dist/Elements/TextArea/TextArea.types';
import { OverviewTexts } from '../Overview/Overview.types';
import { FolderItem } from '../../SidebarObject.types';


export type ContentProps ={
description: React.ReactNode;
tags: React.ReactNode;
textDescription: string;
autoSize: TextareaAutosize;
texts: OverviewTexts;
onDescriptionChange: (value: string) => void;
onFolderSelect: (item: FolderItem) => void;
};