import { type Props as ButtonProps, type ButtonType } from '../Button.types';

type ButtonPropsOmitted = Omit<
  ButtonProps,
  | 'type'
  | 'block'
  | 'color'
  | 'groupVariant'
  | 'icon'
  | 'iconColor'
  | 'mode'
  | 'size'
  | 'onChange'
>;

export type StarButtonProps = ButtonPropsOmitted & {
  active?: boolean;
  hasError?: boolean;
  className?: string;
  type?: ButtonType;
};
