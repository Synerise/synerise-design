import * as React from 'react';

export type EditableParam = { name: string; value: string };

export type EditListProps = {
  autocompleteOptions?: string | React.ReactNode;
  leftColumnName?: string | React.ReactNode;
  rightColumnName?: string | React.ReactNode;
  value?: EditableParam[];
  onChange?: (params: EditableParam[]) => void;
  onSearch?: (query: string) => void;
  onSetParams?: () => void;
  textAddButton?: string;
  renderAddButton?: (params?: EditableParam[]) => JSX.Element;
  renderLeftColumn?: (index: number, param?: EditableParam) => JSX.Element;
  renderRightColumn?: (index: number, param?: EditableParam, ref?: React.ClassAttributes<{}>['ref']) => JSX.Element;
  renderAdditionalColumn?: (row?: EditableParam[]) => JSX.Element;
  renderActions?: boolean | ((param?: EditableParam, idx?: number, params?: EditableParam[]) => JSX.Element);
};
