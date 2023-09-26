import { TreeNode, TreeMenuTexts } from '../../../TreeMenu.types';

export type ChangeAction = (item: TreeNode, items?: TreeNode[]) => void | false;

export type WithChangeActions = {
  onDelete: ChangeAction;
  onEdit: ChangeAction;
  onPaste: (item?: TreeNode, items?: TreeNode[]) => void | false;
  onCopy: ChangeAction;
  onCut: ChangeAction;
  onDuplicate: ChangeAction;
  onVisibilityChange?: ChangeAction;
};

export type ActionProps = WithChangeActions & {
  dropdownMouseOver?: () => void;
  dropdownMouseOut?: () => void;
  item: TreeNode;
  deleteMode: boolean;
  // onVisibleChange: (visible: boolean) => void;
  onDeleteConfirmationVisibilityChange: (visible: boolean) => void;
  texts?: TreeMenuTexts;
  hovered?: boolean;
  favourite?: boolean;
  visible?: boolean;
};
