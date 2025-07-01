import { type ReactNode, type ReactText } from 'react';

export type OperatorTexts = {
  buttonLabel: string;
  searchPlaceholder: string;
  noResults: string;
};

export type OperatorsItem = {
  name: string;
  icon: ReactNode;
  group?: string;
  groupId: ReactText;
  groupName?: string;
  id: ReactText;
  logic?: string;
  value?: string;
  subGroups?: OperatorsGroup[];
};

export type OperatorsGroup = {
  defaultGroup?: boolean;
  icon: ReactNode;
  id: ReactText;
  itemType?: string;
  name: string;
  tooltip?: string;
  subGroups?: OperatorsGroup[];
};

export type OperatorsProps = {
  value?: OperatorsItem | undefined;
  onActivate?: () => void;
  onDeactivate?: () => void;
  onChange: (item: OperatorsItem | undefined) => void;
  groups: OperatorsGroup[];
  items: OperatorsItem[];
  texts?: Partial<OperatorTexts>;
  opened?: boolean;
  getPopupContainerOverride?: (trigger: HTMLElement | null) => HTMLElement;
  readOnly?: boolean;
  errorText?: ReactNode;
  dropdownDimensionsConfig?: {
    defaultHeight?: number;
    lowerHeight?: number;
    threshold?: number;
  };
};

export type OperatorsDropdownProps = {
  setDropdownVisible: (show: boolean) => void;
  setSelected: (val: OperatorsItem | OperatorsGroup) => void;
  groups: OperatorsGroup[];
  items: OperatorsItem[];
  texts: OperatorTexts;
  value: OperatorsItem | undefined;
  outerHeight?: number;
};
