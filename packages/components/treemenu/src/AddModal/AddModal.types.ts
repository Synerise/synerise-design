/*  eslint @typescript-eslint/no-explicit-any: 0 */
import { TreeMenuTexts, TreeNode } from '../TreeMenu.types';
import { ItemProps } from '../Tree/Item/Item.types';

export type AddModalProps = {
  disabled?: boolean;
  texts: TreeMenuTexts;
  context?: TreeNode;
  loading?: boolean;
  tristate?: boolean;
  searchAddTag?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  onItemAdd?: ItemProps['onAdd'];
  itemTypes?: any;
  align?: any;
  hasClipboard?: boolean;
  onItemPaste?: (item?: TreeNode) => void;
} & React.PropsWithChildren;
