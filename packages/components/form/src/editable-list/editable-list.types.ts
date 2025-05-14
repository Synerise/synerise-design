import type { ReactNode } from 'react';
import type { AutocompleteProps } from '@synerise/ds-autocomplete';
import type { InputProps } from 'antd/lib/input';

export type EditableParam = { name: string; value: string };

type AddButtonConfigProps = {
  textAddButton?: string;
  disableAddButton?: boolean;
  onClickAddRow?: () => void;
};
type DeleteHandler = (param?: EditableParam, index?: number, params?: EditableParam[]) => void;

export type EditListProps = {
  autocompleteOptions?: ReactNode;
  leftColumnName?: ReactNode;
  rightColumnName?: ReactNode;
  value?: EditableParam[];
  onChange?: (params: EditableParam[]) => void;
  onSearch?: (query: string) => void;
  onClickDelete?: DeleteHandler;
  addButtonConfig?: AddButtonConfigProps;
  validation?: {
    validateLeftColumn?: (val: string) => ReactNode;
    validateRightColumn?: (val: string) => ReactNode;
  };
  renderAddButton?: (params?: EditableParam[]) => JSX.Element;
  renderLeftColumn?: (param: EditableParam, index: number) => JSX.Element;
  renderRightColumn?: (param: EditableParam, index: number) => JSX.Element;
  renderAdditionalColumn?: (row: EditableParam[]) => JSX.Element;
  renderActions?:
    | boolean
    | ((
        param: EditableParam,
        idx: number,
        params: EditableParam[],
        actionsCallbacks: {
          onClickDelete?: DeleteHandler;
        }
      ) => JSX.Element);
  firstInputProps?: AutocompleteProps;
  secondInputProps?: InputProps;
};
