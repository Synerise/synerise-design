import Step from 'Step/Step';

export type StepperOrientation = 'vertical' | 'horizontal' | string;

export const ORIENTATIONS: {
  VERTICAL: StepperOrientation;
  HORIZONTAL: StepperOrientation;
} = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
};

export type StepperProps = {
  orientation?: StepperOrientation;
};

export type StepperSubComponents = { Step: typeof Step };
