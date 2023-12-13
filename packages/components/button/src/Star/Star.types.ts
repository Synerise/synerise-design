import { Props as ButtonProps } from '../Button.types';

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

export interface StarButtonProps extends ButtonPropsOmitted {
  active?: boolean;
  hasError?: boolean;
  className?: string;
}
