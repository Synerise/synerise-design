/* eslint @typescript-eslint/no-explicit-any: 0 */
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { Node } from 'tree-model';
import React from 'react';
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
    hasClipboard: boolean;
    onAdd: (item: any, context: TreeNode | undefined) => void;
    onSelected: (selected: boolean) => void;
    onEditChange: (item: TreeNode, newName: string, newItems?: TreeNode[]) => void;
    onExpandToggle: (expandedKeys: React.Key[], item: TreeNode, expanded: boolean) => void;
    onClick: (item: TreeNode) => void;
    onVisibilityChange: (item: TreeNode, visible: boolean) => void;
  };

export type ItemRef<T> = HTMLDivElement & {
  treeNode: Node<T>;
};
