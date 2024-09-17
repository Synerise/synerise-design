import React from 'react';
import type { AutocompleteProps } from '@synerise/ds-autocomplete';
import type { InputProps } from 'antd/lib/input';

export type EditableParam = { name: string; value: string };

type AddButtonConfigProps = {
  textAddButton?: string;
  disableAddButton?: boolean;
  onClickAddRow?: () => void;
};

export type EditListProps = {
  autocompleteOptions?: string | React.ReactNode;
  leftColumnName?: string | React.ReactNode;
  rightColumnName?: string | React.ReactNode;
  value?: EditableParam[];
  onChange?: (params: EditableParam[]) => void;
  onSearch?: (query: string) => void;
  onClickDelete?: (param?: EditableParam, index?: number, params?: EditableParam[]) => void;
  addButtonConfig?: AddButtonConfigProps;
  validation?: {
    validateLeftColumn?: (val: string) => string | React.ReactNode | null;
    validateRightColumn?: (val: string) => string | React.ReactNode | null;
  };
  renderAddButton?: (params?: EditableParam[]) => JSX.Element;
  renderLeftColumn?: (param?: EditableParam, index?: number) => JSX.Element;
  renderRightColumn?: (param?: EditableParam, index?: number, ref?: React.ClassAttributes<{}>['ref']) => JSX.Element;
  renderAdditionalColumn?: (row?: EditableParam[]) => JSX.Element;
  renderActions?:
    | boolean
    | ((param?: EditableParam, idx?: number, params?: EditableParam[], actionsCallbacks?: object) => JSX.Element);
  firstInputProps?: AutocompleteProps;
  secondInputProps?: InputProps;
};
