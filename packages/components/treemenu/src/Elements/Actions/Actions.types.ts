import { TreeMenuNode, TreeMenuNodes, TreeMenuTexts } from '../../TreeMenu.types';

export type ChangeAction = (item: TreeMenuNode, items?: TreeMenuNodes, rerender?: () => {}) => void;

export type WithChangeActions = {
  onDelete?: ChangeAction;
  onEdit?: ChangeAction;
  onPaste?: ChangeAction;
  onCopy?: ChangeAction;
  onCut?: ChangeAction;
  onDuplicate?: ChangeAction;
  onEditChange?: ChangeAction;
};

export type ActionProps = WithChangeActions & {
  dropdownMouseOver?: () => void;
  dropdownMouseOut?: () => void;
  item: TreeMenuNode;
  onVisibleChange?: (visible: boolean) => void;
  texts?: TreeMenuTexts;
  hovered?: boolean;
  favourite?: boolean;
  visible?: boolean;
};
