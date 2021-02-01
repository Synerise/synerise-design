import { AbstractCheckboxProps } from 'antd/lib/checkbox/Checkbox';

export interface CheckboxTristateChangeEventTarget extends CheckboxTristateProps {
  checked: boolean | undefined;
  onChange?: (e: CheckboxTristateChangeEvent) => void;
}

export interface CheckboxTristateChangeEvent {
  target: CheckboxTristateChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

export type CheckboxTristateProps = AbstractCheckboxProps<CheckboxTristateChangeEvent>;
