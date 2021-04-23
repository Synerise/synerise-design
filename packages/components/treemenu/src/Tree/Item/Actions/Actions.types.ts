import { TreeNode, TreeMenuTexts } from '../../../TreeMenu.types';

export type ChangeAction = (item: TreeNode, items?: TreeNode[]) => void | false;

export type WithChangeActions = {
  onDelete?: ChangeAction;
  onEdit?: ChangeAction;
  onPaste?: ChangeAction;
  onCopy?: ChangeAction;
  onCut?: ChangeAction;
  onDuplicate?: ChangeAction;
};

export type ActionProps = WithChangeActions & {
  dropdownMouseOver?: () => void;
  dropdownMouseOut?: () => void;
  item: TreeNode;
  onVisibleChange?: (visible: boolean) => void;
  texts?: TreeMenuTexts;
  hovered?: boolean;
  favourite?: boolean;
  visible?: boolean;
};
