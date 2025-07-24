import type { ReactNode } from 'react';

export type AlertInfoProps = {
  size?: AlertSize;
  fontSize?: AlertSize;
  text?: ReactNode;
  button?: ReactNode;
  label?: ReactNode;
  labelPosition?: 'bottom' | 'right';
  mode?: 'absolute';
  customIcon?: React.ReactElement;
  type: 'warning' | 'error' | 'success';
};
export enum AlertSize {
  SMALL = 'small',
  MEDIUM = 'medium',
}
export const IconSize = { [AlertSize.SMALL]: 48, [AlertSize.MEDIUM]: 96 };
export const FontSize = { [AlertSize.SMALL]: 14, [AlertSize.MEDIUM]: 18 };
