import React from 'react';

type MockStepperProps = {
  children?: React.ReactNode;
  className?: string;
  activeStep?: number;
  orientation?: string;
  'data-testid'?: string;
};

type MockStepProps = {
  children?: React.ReactNode;
  label?: React.ReactNode;
  number?: number;
  active?: boolean;
  completed?: boolean;
  disabled?: boolean;
  'data-testid'?: string;
};

export const mockStepper = () => {
  jest.mock('@synerise/ds-stepper', () => {
    const Step = jest.fn(
      ({
        children,
        label,
        number,
        active,
        completed,
        disabled,
        'data-testid': dataTestId,
      }: MockStepProps) => {
        const testId = dataTestId || 'ds-stepper-step';
        return (
          <div
            data-testid={testId}
            data-active={active}
            data-completed={completed}
            data-disabled={disabled}
            data-number={number}
            className="ds-stepper-step"
          >
            {label && <span data-testid={`${testId}-label`}>{label}</span>}
            {children}
          </div>
        );
      },
    );

    const Stepper = Object.assign(
      jest.fn(
        ({
          children,
          className,
          activeStep,
          orientation,
          'data-testid': dataTestId,
        }: MockStepperProps) => {
          const testId = dataTestId || 'ds-stepper';
          return (
            <div
              data-testid={testId}
              className={`ds-stepper ${className || ''}`}
              data-active-step={activeStep}
              data-orientation={orientation}
            >
              {children}
            </div>
          );
        },
      ),
      { Step },
    );

    return {
      __esModule: true,
      default: Stepper,
    };
  });
};

export const mockStepperMinimal = () => {
  jest.mock('@synerise/ds-stepper', () => {
    const Stepper = Object.assign(
      jest.fn(() => null),
      {
        Step: jest.fn(() => null),
      },
    );

    return {
      __esModule: true,
      default: Stepper,
    };
  });
};
