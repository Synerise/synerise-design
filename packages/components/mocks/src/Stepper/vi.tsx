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

/**
 * Factory function for Stepper mock.
 * Mocks the entire @synerise/ds-stepper package including Stepper and Stepper.Step.
 *
 * @example
 * ```typescript
 * import { stepperMockFactory } from '@synerise/ds-mocks/Stepper/vi';
 *
 * vi.mock('@synerise/ds-stepper', stepperMockFactory);
 * ```
 */
export const stepperMockFactory = () => {
  const Step = vi.fn(
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
    vi.fn(
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
    default: Stepper,
  };
};

/**
 * Factory function for minimal Stepper mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-stepper', stepperMinimalMockFactory);
 * ```
 */
export const stepperMinimalMockFactory = () => {
  const Stepper = Object.assign(
    vi.fn(() => null),
    {
      Step: vi.fn(() => null),
    },
  );

  return {
    default: Stepper,
  };
};
