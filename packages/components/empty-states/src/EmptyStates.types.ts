import { ReactElement, ReactNode } from 'react';

export type EmptyStatesProps = {
  size?: EmptyStatesSize;
  fontSize?: EmptyStatesSize;
  text?: ReactNode;
  button?: ReactNode;
  label?: ReactNode;
  labelPosition?: 'bottom' | 'right';
  mode?: 'absolute';
  customIcon?: ReactElement;
  className?: string;
};

export enum EmptyStatesSize {
  SMALL = 'small',
  MEDIUM = 'medium',
}

export const IconSize = { [EmptyStatesSize.SMALL]: 48, [EmptyStatesSize.MEDIUM]: 96 };
export const FontSize = { [EmptyStatesSize.SMALL]: 14, [EmptyStatesSize.MEDIUM]: 18 };
