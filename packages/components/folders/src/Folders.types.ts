export type FoldersProps = {
  addButtonDisabled?: boolean;
  actionsDisplay: 'inline' | 'dropdown';
  dataSource: FolderItem[];
  visibleItemsCount?: number;
};
export type FolderItem = {
  id: string;
  name: string;
  favourite?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  canDuplicate?: boolean;
};
