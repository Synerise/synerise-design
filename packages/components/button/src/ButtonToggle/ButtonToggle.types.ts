import type { ButtonProps } from '../Button.types';

export type ButtonToggleProps = Omit<ButtonProps, 'type' | 'danger' | 'ghost' | 'color'> & {
  type?: 'solid' | 'ghost';
  activated?: boolean;
};
