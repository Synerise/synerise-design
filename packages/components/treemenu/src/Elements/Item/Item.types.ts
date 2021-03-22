/* eslint @typescript-eslint/no-explicit-any: 0 */
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { TreeMenuNode, TreeMenuTexts } from '../../TreeMenu.types';
import { WithChangeActions } from '../Actions/Actions.types';

export type ItemProps = MenuItemProps &
  WithChangeActions & {
    item: TreeMenuNode;
    draggable?: boolean;
    depth?: number;
    expanded?: boolean;
    ghostDynamic?: boolean;
    texts?: TreeMenuTexts;
    editMode?: boolean;
    index?: number;
    itemTypes?: any;
    onAdd: (item: any, context: TreeMenuNode | undefined) => void;
    onSelected?: (selected: boolean) => void;
    onEditMode?: (editMode: boolean) => void;
    onEditModeChange?: (event: any) => void;
    onExpandToggle?: (item: TreeMenuNode, expanded: boolean) => void;
  };
