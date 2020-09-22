import { CheckboxProps as AntCheckboxProps } from 'antd/lib/checkbox/Checkbox';

export interface CheckboxProps extends AntCheckboxProps {
  description?: string;
  errorText?: string;
  hasError?: boolean;
  withoutPadding?: boolean;
}
