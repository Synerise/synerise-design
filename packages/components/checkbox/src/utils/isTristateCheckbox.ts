import type { CheckboxProps, CheckboxTristateProps } from '../Checkbox.types';

export const isTristateCheckbox = (
  props: CheckboxProps | CheckboxTristateProps,
): props is CheckboxTristateProps => {
  return !!('tristate' in props && props.tristate);
};
