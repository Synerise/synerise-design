import React from 'react';

type MockWizardProps = {
  children?: React.ReactNode;
  className?: string;
  steps?: Array<{ title?: string; description?: string }>;
  activeStep?: number;
  'data-testid'?: string;
};

type MockWizardOnModalProps = {
  children?: React.ReactNode;
  open?: boolean;
  visible?: boolean;
  title?: React.ReactNode;
  onClose?: () => void;
  'data-testid'?: string;
};

/**
 * Factory function for Wizard mock.
 * Mocks the entire @synerise/ds-wizard package including Wizard and Wizard.OnModal.
 *
 * @example
 * ```typescript
 * import { wizardMockFactory } from '@synerise/ds-mocks/Wizard/vi';
 *
 * vi.mock('@synerise/ds-wizard', wizardMockFactory);
 * ```
 */
export const wizardMockFactory = () => {
  const OnModal = vi.fn(
    ({
      children,
      open,
      visible,
      title,
      onClose,
      'data-testid': dataTestId,
    }: MockWizardOnModalProps) => {
      const testId = dataTestId || 'ds-wizard-on-modal';
      const isOpen = open ?? visible;
      if (!isOpen) {
        return null;
      }
      return (
        <div data-testid={testId} className="ds-wizard-on-modal">
          {title && <div data-testid={`${testId}-title`}>{title}</div>}
          {onClose && (
            <button data-testid={`${testId}-close`} onClick={onClose}>
              Close
            </button>
          )}
          {children}
        </div>
      );
    },
  );

  const Wizard = Object.assign(
    vi.fn(
      ({
        children,
        className,
        steps,
        activeStep,
        'data-testid': dataTestId,
      }: MockWizardProps) => {
        const testId = dataTestId || 'ds-wizard';
        return (
          <div data-testid={testId} className={className || 'ds-wizard'}>
            {steps && (
              <div data-testid={`${testId}-steps`}>
                {steps.map((step, index) => (
                  <div
                    key={index}
                    data-testid={`${testId}-step-${index}`}
                    data-active={index === activeStep}
                  >
                    {step.title}
                  </div>
                ))}
              </div>
            )}
            {children}
          </div>
        );
      },
    ),
    { OnModal },
  );

  return {
    default: Wizard,
  };
};

/**
 * Factory function for minimal Wizard mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-wizard', wizardMinimalMockFactory);
 * ```
 */
export const wizardMinimalMockFactory = () => {
  const Wizard = Object.assign(
    vi.fn(() => null),
    { OnModal: vi.fn(() => null) },
  );

  return {
    default: Wizard,
  };
};
