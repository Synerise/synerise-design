import * as React from 'react';

export type EmptyStatesProps = {
  size?: EmptyStatesSize;
  fontSize?: EmptyStatesSize;
  text?: string | React.ReactNode;
  button?: string | React.ReactNode;
  label?: string | React.ReactNode;
  labelPosition?: 'bottom' | 'right';
  mode?: 'absolute';
  customIcon?: React.ReactElement;
};
export enum EmptyStatesSize {
  SMALL = 'small',
  MEDIUM = 'medium',
}
export const IconSize = { [EmptyStatesSize.SMALL]: 48, [EmptyStatesSize.MEDIUM]: 96 };
export const FontSize = { [EmptyStatesSize.SMALL]: 14, [EmptyStatesSize.MEDIUM]: 18 };
