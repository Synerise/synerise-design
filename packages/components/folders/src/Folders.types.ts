export type FoldersProps = {
  actionsDisplay: 'inline' | 'dropdown';
  dataSource: FolderItem[];
};
export type FolderItem = {
  id: string;
  name: string;
  favourite?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  canDuplicate?: boolean;
};
