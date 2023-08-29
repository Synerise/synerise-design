import { CSSProperties } from 'styled-components';
import Step from './Step/Step';

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
};

export type StepperSubComponents = { Step: typeof Step };
