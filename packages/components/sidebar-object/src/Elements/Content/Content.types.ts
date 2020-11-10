import { OverviewTexts } from '../Overview/Overview.types';
import { FolderItem } from '../../SidebarObject.types';


export type ContentProps ={
mainContent: React.ReactNode;
tags: React.ReactNode;
textDescription: string;
texts: OverviewTexts;
onDescriptionChange?: (value: string) => void;
onFolderSelect: (item: FolderItem) => void;
};