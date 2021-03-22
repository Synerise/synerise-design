/* eslint @typescript-eslint/no-explicit-any: 0 */
import { ReactNode } from 'react';
import { SortableContainerProps } from 'react-sortable-hoc';
import { Node } from 'tree-model';

export enum TreeMenuTypes {
  Folder = 'folder',
}

export type TreeMenuItem = {
  name: string;
  type?: string;
  children?: TreeMenuItems;
};

export type TreeMenuItems = TreeMenuItem[];

export type TreeMenuNode = Node<TreeMenuItem>;

export type TreeMenuNodes = TreeMenuNode[];

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
};

export type TreeMenuItemAction = (item: TreeMenuNode, context: TreeMenuNode | undefined) => TreeMenuNode | false;

export type TreeMenuProps = Pick<SortableContainerProps, 'getContainer'> & {
  texts?: TreeMenuTexts;
  showToolbar?: boolean | ReactNode;
  showHeader?: boolean | ReactNode;
  addItemList?: any;
  draggable?: boolean;
  ghostDynamic?: boolean;
  dataSource?: TreeMenuItems;
  defaultItems?: TreeMenuItems;
  count?: number;
  onItemAdd?: (addItem: any, context: TreeMenuNode | undefined) => TreeMenuNode | false | void;
  onItemClick?: () => void;
};

export type TreeMenuItemRef = HTMLDivElement & {
  item: TreeMenuItem;
  node: Node<TreeMenuItem>;
};

export type TreeMenuSortableNode = {
  node?: TreeMenuItemRef;
};
