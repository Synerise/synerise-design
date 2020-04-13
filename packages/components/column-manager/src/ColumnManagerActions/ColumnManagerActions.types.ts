import * as React from 'react';
import { ViewMeta } from '../ColumnManager.types';

export type Props = {
  onSave: (viewMeta: ViewMeta) => void;
  onApply: () => void;
  onCancel: () => void;
  texts: {
    [k: string]: string | React.ReactNode;
  };
};

export const INPUT_NAMES = ['name', 'description'] as const;

export type FormFields = {
  [k in typeof INPUT_NAMES[number]]: {
    value: string;
    error: string | React.ReactNode;
  };
};

export type State = FormFields & {
  modalVisible: boolean;
};
