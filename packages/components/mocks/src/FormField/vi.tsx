import React from 'react';

type MockFormFieldProps = {
  children?: React.ReactNode;
  className?: string;
  label?: React.ReactNode;
  errorText?: React.ReactNode;
  description?: React.ReactNode;
  tooltip?: React.ReactNode;
  'data-testid'?: string;
};

type MockFormFieldLabelProps = {
  children?: React.ReactNode;
  className?: string;
  htmlFor?: string;
  'data-testid'?: string;
};

type MockContentElementProps = {
  children?: React.ReactNode;
  'data-testid'?: string;
};

/**
 * Factory function for FormField mock.
 * Mocks the entire @synerise/ds-form-field package including FormField, FormFieldLabel,
 * ContentAboveElement, and ContentBelowElement.
 *
 * @example
 * ```typescript
 * import { formFieldMockFactory } from '@synerise/ds-mocks/FormField/vi';
 *
 * vi.mock('@synerise/ds-form-field', formFieldMockFactory);
 * ```
 */
export const formFieldMockFactory = () => {
  const FormField = vi.fn(
    ({
      children,
      className,
      label,
      errorText,
      description,
      tooltip,
      'data-testid': dataTestId,
    }: MockFormFieldProps) => {
      const testId = dataTestId || 'ds-form-field';
      return (
        <div data-testid={testId} className={className}>
          {label && <div data-testid={`${testId}-label`}>{label}</div>}
          {tooltip && <div data-testid={`${testId}-tooltip`}>{tooltip}</div>}
          {description && (
            <div data-testid={`${testId}-description`}>{description}</div>
          )}
          {children}
          {errorText && <div data-testid={`${testId}-error`}>{errorText}</div>}
        </div>
      );
    },
  );

  const FormFieldLabel = vi.fn(
    ({
      children,
      className,
      htmlFor,
      'data-testid': dataTestId,
    }: MockFormFieldLabelProps) => (
      <label
        data-testid={dataTestId || 'ds-form-field-label'}
        className={className}
        htmlFor={htmlFor}
      >
        {children}
      </label>
    ),
  );

  const ContentAboveElement = vi.fn(
    ({ children, 'data-testid': dataTestId }: MockContentElementProps) => (
      <div data-testid={dataTestId || 'ds-content-above'}>{children}</div>
    ),
  );

  const ContentBelowElement = vi.fn(
    ({ children, 'data-testid': dataTestId }: MockContentElementProps) => (
      <div data-testid={dataTestId || 'ds-content-below'}>{children}</div>
    ),
  );

  return {
    default: FormField,
    FormFieldLabel,
    ContentAboveElement,
    ContentBelowElement,
  };
};

/**
 * Factory function for minimal FormField mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-form-field', formFieldMinimalMockFactory);
 * ```
 */
export const formFieldMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  FormFieldLabel: vi.fn(() => null),
  ContentAboveElement: vi.fn(() => null),
  ContentBelowElement: vi.fn(() => null),
});
