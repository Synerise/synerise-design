import * as React from 'react';

export const ALL_FACTOR_TYPES = [
  'text',
  'number',
  'parameter',
  'contextParameter',
  'dynamicKey',
  'formula',
  'array',
  'date',
] as const;
export type FactorType = typeof ALL_FACTOR_TYPES[number] | string;
export type DynamicKeyValueType = { key: React.ReactText; value: React.ReactText };
export type FormulaValueType = { name: string; value: string };
export type ParameterValueType = {
  type: string;
  icon: string;
  name: string;
  id: React.ReactText;
};

export type ParameterGroup = {
  id: React.ReactText;
  name: string;
  defaultGroup?: boolean;
  icon?: React.ReactNode;
  subGroups?: ParameterGroup[];
};

export type ParameterItem = {
  id: React.ReactText;
  name: string;
  groupId?: React.ReactText;
  icon?: React.ReactNode;
};

export type FactorValueType =
  | string
  | number
  | Date
  | undefined
  | DynamicKeyValueType
  | FormulaValueType
  | ParameterValueType;

export type SelectedFactorType = {
  name: string;
  icon: React.ReactNode;
  input: React.ReactNode;
};

export type FactorsTexts = {
  datePicker: {
    apply: string;
    clearTooltip: string;
    inputPlaceholder: string;
    now: string;
  };
  dynamicKey: {
    keyPlaceholder: string;
    valuePlaceholder: string;
  };
  formula: {
    buttonPlaceholder: string;
  };
  parameter: {
    searchPlaceholder: string;
    noResults: string;
  };
  valuePlaceholder: string;
  modalApply: string;
  modalCancel: string;
  modalTitle: string;
};

export type FactorsProps = {
  withoutTypeSelector?: boolean;
  unavailableFactorTypes?: FactorType[];
  availableFactorTypes?: FactorType[];
  selectedFactorType: FactorType;
  setSelectedFactorType: (factor: FactorType) => void;
  defaultFactorType: FactorType;
  onChangeValue: (value: FactorValueType) => void;
  value: FactorValueType;
  expansibleText?: boolean;
  autocompleteText?: {
    options: string[];
  };
  parameters?: {
    buttonLabel: string | React.ReactNode;
    buttonIcon: React.ReactNode;
    groups?: ParameterGroup[];
    items: ParameterItem[];
    showAllGroup?: boolean;
  };
  texts: FactorsTexts;
};

export type FactorTypeSelectorProps = Pick<
  FactorsProps,
  'unavailableFactorTypes' | 'availableFactorTypes' | 'selectedFactorType' | 'setSelectedFactorType'
> & {
  selectedFactor: SelectedFactorType;
};

export type FactorValueProps = Pick<
  FactorsProps,
  | 'onChangeValue'
  | 'value'
  | 'selectedFactorType'
  | 'expansibleText'
  | 'parameters'
  | 'autocompleteText'
  | 'withoutTypeSelector'
  | 'texts'
> & {
  selectedFactor: SelectedFactorType;
};

export type InputProps = Pick<
  FactorsProps,
  'value' | 'expansibleText' | 'parameters' | 'autocompleteText' | 'withoutTypeSelector' | 'texts'
> & {
  onChange: (value: FactorValueType) => void;
};

export type TextModalProps = {
  value: string;
  onApply: (value: string) => void;
  visible: boolean;
  onCancel: () => void;
  texts: FactorsTexts;
};

export type ParameterDropdownProps = {
  setDropdownVisible: (show: boolean) => void;
  setSelected: (val: ParameterItem) => void;
  groups?: ParameterGroup[];
  items?: ParameterItem[];
  texts: FactorsTexts;
};

export type FormulaModalProps = {
  value: FormulaValueType;
  onApply: (value: FormulaValueType) => void;
  visible: boolean;
  onCancel: () => void;
  texts: FactorsTexts;
};
