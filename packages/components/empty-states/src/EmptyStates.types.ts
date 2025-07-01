import { type ReactElement, type ReactNode } from 'react';

export type EmptyStatesProps = {
  size?: EmptyStatesSize;
  fontSize?: EmptyStatesSize;
  text?: ReactNode;
  button?: ReactNode;
  label?: ReactNode;
  /**
   * @deprecated
   */
  labelPosition?: 'bottom' | 'right';
  mode?: 'absolute';
  customIcon?: ReactElement;
  className?: string;
  iconPosition?: 'top' | 'left' | 'right';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
};

export enum EmptyStatesSize {
  SMALL = 'small',
  MEDIUM = 'medium',
}

export const IconSize = {
  [EmptyStatesSize.SMALL]: 48,
  [EmptyStatesSize.MEDIUM]: 96,
};
export const FontSize = {
  [EmptyStatesSize.SMALL]: 14,
  [EmptyStatesSize.MEDIUM]: 18,
};
