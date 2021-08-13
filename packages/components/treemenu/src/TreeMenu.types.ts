/* eslint @typescript-eslint/no-explicit-any: 0 */
import { ReactNode } from 'react';
import { Node } from 'tree-model';
import { TreeProps, TreeData, TreeNode } from './Tree/Tree.types';

export { TreeData, TreeNode };

export enum TreeMenuTypes {
  Folder = 'folder',
}

export type IconType = ReactNode | ((props: any) => ReactNode);

// Oldies
export type TreeMenuItem = {
  name: string;
  type?: string;
  children?: TreeMenuItems;
  editMode?: boolean;
  id?: string;
  key?: string;
  hidden?: boolean;
};
export type TreeMenuItems = TreeMenuItem[];
// End of oldies

export type TreeMenuTexts = {
  addItem?: string;
  addItemLabel?: string;
  visible?: string;
  elements?: string;
  cut?: string;
  paste?: string;
  copy?: string;
  duplicate?: string;
  edit?: string;
  delete?: string;
  deleteConfirm?: string;
  loading?: string;
  searchClear?: string;
  search?: string;
  showItem?: string;
  hideItem?: string;
  cutTooltip?: string;
  noResults?: string;
  pasteTooltip?: string;
};

export type TreeMenuItemAction = (item: TreeNode, context: TreeNode | undefined) => TreeNode | false;

export type TreeMenuProps = Omit<TreeProps, 'items' | 'hasClipboard'> & {
  texts?: TreeMenuTexts;
  showToolbar?: boolean | ReactNode;
  showHeader?: boolean | ReactNode;
  dataSource?: TreeData[];
  onChange: (items: TreeData[]) => void;
};

export type TreeMenuItemRef = HTMLDivElement & {
  item: TreeMenuItem;
  node: Node<TreeMenuItem>;
};

export type TreeMenuSortableNode = {
  node?: TreeMenuItemRef;
};
