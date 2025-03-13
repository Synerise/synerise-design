import { ReactNode } from 'react';
import { CheckboxProps as AntCheckboxProps } from 'antd/lib/checkbox/Checkbox';

export type BaseCheckboxProps = {
  description?: ReactNode;
  errorText?: string;
  hasError?: boolean;
  withoutPadding?: boolean;
};

export type CheckboxProps = AntCheckboxProps & BaseCheckboxProps;
