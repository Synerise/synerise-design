/* eslint @typescript-eslint/no-explicit-any: 0 */
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { TreeNode, TreeMenuTexts } from '../../TreeMenu.types';
import { WithChangeActions } from '../../Tree/Item/Actions/Actions.types';

export type ItemProps = Omit<MenuItemProps, 'onClick'> &
  WithChangeActions & {
    item: TreeNode;
    draggable?: boolean;
    depth?: number;
    expanded?: boolean;
    ghostDynamic?: boolean;
    texts: TreeMenuTexts;
    editMode?: boolean;
    index?: number;
    itemTypes?: any;
    onAdd: (item: any, context: TreeNode | undefined) => void;
    onSelected?: (selected: boolean) => void;
    onEditMode?: (editMode: boolean) => void;
    onEditModeChange?: (event: any) => void;
    onExpandToggle?: (item: TreeNode, expanded: boolean) => void;
    onClick?: (item: TreeNode) => void;
  };
