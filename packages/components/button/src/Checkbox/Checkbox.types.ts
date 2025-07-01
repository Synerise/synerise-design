import { type Props as ButtonProps } from '../Button.types';

type ButtonPropsOmitted = Omit<
  ButtonProps,
  | 'type'
  | 'block'
  | 'color'
  | 'groupVariant'
  | 'icon'
  | 'iconColor'
  | 'leftIconSize'
  | 'mode'
  | 'rightIconSize'
  | 'size'
  | 'onChange'
>;

export type CheckboxButtonProps = ButtonPropsOmitted & {
  checked?: boolean;
  defaultChecked?: boolean;
  hasError?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
};

export type ButtonCheckboxIconProps = {
  checked?: boolean;
  indeterminate?: boolean;
};
