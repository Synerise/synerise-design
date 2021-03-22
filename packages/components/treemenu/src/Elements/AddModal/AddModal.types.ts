import { TreeMenuTexts, TreeMenuNode, TreeMenuProps } from '../../TreeMenu.types';

export type AddModalProps = Pick<TreeMenuProps, 'onItemAdd'> & {
  disabled?: boolean;
  texts?: TreeMenuTexts;
  context?: TreeMenuNode;
  loading?: boolean;
  tristate?: boolean;
  searchAddTag?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemTypes?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  align?: any;
};
