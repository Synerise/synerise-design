import type {
  AbstractCheckboxProps,
  CheckboxProps as AntCheckboxProps,
} from 'antd/lib/checkbox/Checkbox';
import type { ReactNode } from 'react';

export type BaseCheckboxProps = {
  description?: ReactNode;
  errorText?: string;
  hasError?: boolean;
  withoutPadding?: boolean;
};

export type CheckboxTristateChangeEventTarget = CheckboxTristateProps & {
  checked: boolean | undefined;
  onChange?: (e: CheckboxTristateChangeEvent) => void;
};

export type CheckboxTristateChangeEvent = {
  target: CheckboxTristateChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
};

type OnChangeBaseProps = {
  tristate?: never | false | undefined;
  onChange?: AntCheckboxProps['onChange'];
};
type OnChangeTristateProps = {
  tristate: true;
  onChange?: AbstractCheckboxProps<CheckboxTristateChangeEvent>['onChange'];
};

export type CheckboxBaseProps = Omit<AntCheckboxProps, 'onChange'> &
  BaseCheckboxProps &
  OnChangeBaseProps;
export type CheckboxTristateProps = Omit<AntCheckboxProps, 'onChange'> &
  BaseCheckboxProps &
  OnChangeTristateProps;

export type CheckboxProps = CheckboxBaseProps | CheckboxTristateProps;
