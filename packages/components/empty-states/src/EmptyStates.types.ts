import * as React from 'react';

export enum IconSize {
  'small' = 48,
  'medium' = 96,
}
export enum FontSize {
  'small' = 14,
  'medium' = 18,
}

export type EmptyStatesProps = {
  size?: 'small' | 'medium';
  fontSize?: 'small' | 'medium';
  text?: string | React.ReactNode;
  button?: string | React.ReactNode;
  label?: string | React.ReactNode;
  labelPosition?: 'bottom' | 'right';
  mode?: 'absolute';
  customIcon?: React.ReactElement;
};
