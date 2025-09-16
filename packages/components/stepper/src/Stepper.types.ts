import type { CSSProperties, ReactNode } from 'react';

export type StepperOrientation = 'vertical' | 'horizontal' | string;
export type StepperSize = 'small' | 'default' | string;

export const ORIENTATIONS: {
  VERTICAL: StepperOrientation;
  HORIZONTAL: StepperOrientation;
} = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
};

export type StepperProps = {
  orientation?: StepperOrientation;
  style?: CSSProperties;
  size?: StepperSize;
  children?: ReactNode;
};
