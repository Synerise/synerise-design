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

export const mockFormField = () => {
  jest.mock('@synerise/ds-form-field', () => {
    const FormField = jest.fn(
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
            {errorText && (
              <div data-testid={`${testId}-error`}>{errorText}</div>
            )}
          </div>
        );
      },
    );

    const FormFieldLabel = jest.fn(
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

    const ContentAboveElement = jest.fn(
      ({ children, 'data-testid': dataTestId }: MockContentElementProps) => (
        <div data-testid={dataTestId || 'ds-content-above'}>{children}</div>
      ),
    );

    const ContentBelowElement = jest.fn(
      ({ children, 'data-testid': dataTestId }: MockContentElementProps) => (
        <div data-testid={dataTestId || 'ds-content-below'}>{children}</div>
      ),
    );

    return {
      __esModule: true,
      default: FormField,
      FormFieldLabel,
      ContentAboveElement,
      ContentBelowElement,
    };
  });
};

export const mockFormFieldMinimal = () => {
  jest.mock('@synerise/ds-form-field', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    FormFieldLabel: jest.fn(() => null),
    ContentAboveElement: jest.fn(() => null),
    ContentBelowElement: jest.fn(() => null),
  }));
};
