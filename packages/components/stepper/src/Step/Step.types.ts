import { type ReactNode } from 'react';

import { type StepperOrientation, type StepperSize } from '../Stepper.types';

export type StepProps = {
  label: string | ReactNode;
  stepNumber: number;
  active?: boolean;
  done?: boolean;
  warning?: boolean;
  validated?: boolean;
  children?: ReactNode;
  tooltip?: string | ReactNode;
  onClick?: () => void;
  size?: StepperSize;
  orientation?: StepperOrientation;
};
