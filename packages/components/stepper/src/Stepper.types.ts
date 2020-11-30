export type StepperType = 'vertical' | 'horizontal' | string;

export const TYPES: {
  VERTICAL: StepperType;
  HORIZONTAL: StepperType;
} = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
};

export type StepperProps = {
  type?: StepperType;
};
