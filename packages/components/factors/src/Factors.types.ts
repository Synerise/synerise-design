import * as React from 'react';

export const ALL_FACTOR_TYPES = [
  'text',
  'number',
  'parameter',
  'context_parameter',
  'dynamic_key',
  'formula',
  'array',
  'date',
] as const;
export type FactorType = typeof ALL_FACTOR_TYPES[number];
export type DynamiKeyValueType = { key: React.ReactText; value: React.ReactText };
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
  | DynamiKeyValueType
  | FormulaValueType
  | ParameterValueType;
export type SelectedFactorType = {
  name: string;
  icon: React.ReactNode;
  input: React.ReactNode;
};

export type FactorsProps = {
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
};

export type FactorTypeSelectorProps = Pick<
  FactorsProps,
  'unavailableFactorTypes' | 'availableFactorTypes' | 'selectedFactorType' | 'setSelectedFactorType'
> & {
  selectedFactor: SelectedFactorType;
};

export type FactorValueProps = Pick<
  FactorsProps,
  'onChangeValue' | 'value' | 'selectedFactorType' | 'expansibleText' | 'parameters' | 'autocompleteText'
> & {
  selectedFactor: SelectedFactorType;
};

export type InputProps = Pick<FactorsProps, 'value' | 'expansibleText' | 'parameters' | 'autocompleteText'> & {
  onChange: (value: FactorValueType) => void;
};
