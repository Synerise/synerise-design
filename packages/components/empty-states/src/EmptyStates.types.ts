import * as React from 'react';

export enum IconSize {
  'L' = 48,
  'XL' = 96,
}
export enum FontSize {
  'small' = 14,
  'medium' = 18,
}

export type EmptyStatesProps = {
  size?: 'L' | 'XL';
  fontSize?: 'small' | 'medium';
  text?: string | React.ReactNode;
  button?: string | React.ReactNode;
  label?: string | React.ReactNode;
  labelPosition?: 'bottom' | 'right';
  mode?: 'absolute';
  customIcon?: React.ReactElement;
  type: string | 'Add' | 'NoResults' | 'SearchNoResults';
};
