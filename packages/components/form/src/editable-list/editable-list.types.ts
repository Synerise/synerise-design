import * as React from 'react';

export type EditableParam = { name: string; value: string };

export type EditListProps = {
  autocompleteOptions?: string | React.ReactNode;
  leftColumnName?: string | React.ReactNode;
  rightColumnName?: string | React.ReactNode;
  value?: EditableParam[];
  onChange?: (params: EditableParam[]) => void;
  onSearch?: (query: string) => void;
  onClickAddRow?: () => void;
  onClickDelete?: (param?: EditableParam, index?: number, params?: EditableParam[]) => void;
  textAddButton?: string;
  renderAddButton?: (params?: EditableParam[]) => JSX.Element;
  renderLeftColumn?: (param?: EditableParam, index?: number) => JSX.Element;
  renderRightColumn?: (param?: EditableParam, index?: number, ref?: React.ClassAttributes<{}>['ref']) => JSX.Element;
  renderAdditionalColumn?: (row?: EditableParam[]) => JSX.Element;
  renderActions?:
    | boolean
    | ((param?: EditableParam, idx?: number, params?: EditableParam[], actionsCallbacks?: object) => JSX.Element);
};
