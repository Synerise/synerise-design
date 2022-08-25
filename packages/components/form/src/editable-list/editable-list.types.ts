import * as React from 'react';

export type EditableParam = { name: string; value: string };

export type EditListProps = {
  autocompleteOptions?: string | React.ReactNode;
  leftColumnName?: string | React.ReactNode;
  rightColumnName?: string | React.ReactNode;
  value?: EditableParam[];
  onChange?: (params: EditableParam[]) => void;
  onSearch?: (query: string) => void;
  textAddButton?: string;
  renderAddButton?: (params?: EditableParam[]) => JSX.Element;
  renderLeftColumn?: (props?: EditableParam) => JSX.Element;
  renderRightColumn?: (props?: EditableParam, ref?: React.ClassAttributes<{}>['ref']) => JSX.Element;
  renderAdditionalColumn?: (row?: EditableParam[]) => JSX.Element;
  renderActions?: boolean | ((param?: EditableParam, idx?: number, params?: EditableParam[]) => JSX.Element);
};
