import { type CheckboxProps as AntCheckboxProps } from 'antd/lib/checkbox/Checkbox';
import { type ReactNode } from 'react';

export type BaseCheckboxProps = {
  description?: ReactNode;
  errorText?: string;
  hasError?: boolean;
  withoutPadding?: boolean;
};

export type CheckboxProps = AntCheckboxProps & BaseCheckboxProps;
