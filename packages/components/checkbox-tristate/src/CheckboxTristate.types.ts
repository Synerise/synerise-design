import type { AbstractCheckboxProps } from 'antd/lib/checkbox/Checkbox';

import type { BaseCheckboxProps } from '@synerise/ds-checkbox';

export type CheckboxTristateProps =
  AbstractCheckboxProps<CheckboxTristateChangeEvent> & BaseCheckboxProps;

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
