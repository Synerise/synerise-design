/* eslint @typescript-eslint/no-explicit-any: 0 */
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { Node } from 'tree-model';
import { TreeMenuTexts, TreeNode } from '../../TreeMenu.types';
import { WithChangeActions } from './Actions/Actions.types';

export type ItemProps = Omit<MenuItemProps, 'onClick'> &
  WithChangeActions & {
    item: TreeNode;
    addItemList: any;
    draggable?: boolean;
    depth?: number;
    expandedKeys?: React.Key[];
    ghostDynamic?: boolean;
    texts?: TreeMenuTexts;
    editMode?: boolean;
    index?: number;
    itemTypes?: any;
    searchQuery?: string;
    onAdd?: (item: any, context: TreeNode | undefined) => void;
    onSelected?: (selected: boolean) => void;
    onEditChange?: (item: TreeNode, newTitle: string, treeNode?: TreeNode) => void;
    onExpandToggle?: (expandedKeys: React.Key[], item: TreeNode, expanded: boolean) => void;
    onClick?: (item: TreeNode) => void;
  };

export type ItemRef<T> = HTMLDivElement & {
  treeNode: Node<T>;
};
