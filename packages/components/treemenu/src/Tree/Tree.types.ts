import { ReactNode, CSSProperties, ReactText } from 'react';
import { SortableContainerProps } from 'react-sortable-hoc';
import { Node } from 'tree-model';
import { TreeMenuTexts } from '../TreeMenu.types';

import { ItemRef, ItemProps } from './Item/Item.types';

export type TreeProps = Pick<SortableContainerProps, 'getContainer'> & {
  items: TreeData[];
  addItemList?: any;
  expandedKeys?: React.Key[];
  draggable?: boolean;
  searchQuery?: string;
  texts?: TreeMenuTexts;
  hasClipboard: boolean;

  onItemEditChange?: ItemProps['onEditChange'];
  onItemExpandToggle?: ItemProps['onExpandToggle'];
  onItemAdd?: ItemProps['onAdd'];
  onItemDuplicate?: ItemProps['onDuplicate'];
  onItemCopy?: ItemProps['onCopy'];
  onItemPaste?: ItemProps['onPaste'];
  onItemCut?: ItemProps['onCut'];
  onItemDelete?: ItemProps['onDelete'];
  onItemVisibilityChange?: ItemProps['onVisibilityChange'];

  onItemDragStart?: (draggedNode: TreeNode) => void;
  onItemDragEnd?: (items: TreeData[], draggedNode: TreeNode, targetNode?: TreeNode) => void;
};

export type IconType = ReactNode | ((props: any) => ReactNode);

export type TreeData = {
  id?: ReactText;
  key?: ReactText;
  name: ReactText;
  icon?: IconType;
  disabled?: boolean;
  draggable?: boolean;
  checkable?: boolean;
  checked?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: TreeData[];
  type?: string;
  hidden?: boolean;
};

export type TreeNode = Node<TreeData>;

export type SortableItemRef = ItemRef<TreeData>;

export type SortableNode = {
  node?: SortableItemRef;
};
