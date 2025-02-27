import { ReactNode } from 'react';
import { CheckboxProps as AntCheckboxProps } from 'antd/lib/checkbox/Checkbox';

export interface CheckboxProps extends AntCheckboxProps {
  description?: ReactNode;
  errorText?: string;
  hasError?: boolean;
  withoutPadding?: boolean;
}
