import * as React from 'react';
import { StepperOrientation, StepperSize } from '../Stepper.types';

export type StepProps = {
  label: string | React.ReactNode;
  stepNumber: number;
  active?: boolean;
  done?: boolean;
  validated?: boolean;
  tooltip?: string | React.ReactNode;
  onClick?: () => void;
  size?: StepperSize;
  orientation?: StepperOrientation;
};
