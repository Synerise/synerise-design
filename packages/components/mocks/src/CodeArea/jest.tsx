import React from 'react';

type MockCodeAreaProps = {
  children?: React.ReactNode;
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
  currentSyntax?: string;
  onSyntaxChange?: (syntax: string) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  errorText?: React.ReactNode;
  placeholder?: React.ReactNode;
  readOnly?: boolean;
  disabled?: boolean;
  allowFullscreen?: boolean;
  counter?: { limit: number; placement?: 'bottom' | 'top' };
  tooltip?: React.ReactNode;
  'data-testid'?: string;
};

export const mockCodeArea = () => {
  jest.mock('@synerise/ds-code-area', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        className,
        value,
        onChange,
        currentSyntax,
        label,
        description,
        errorText,
        placeholder,
        readOnly,
        counter,
        'data-testid': dataTestId,
      }: MockCodeAreaProps) => {
        const testId = dataTestId || 'ds-code-area';
        return (
          <div
            className={`ds-code-area ${className || ''}`}
            data-testid={testId}
          >
            {label && <div data-testid={`${testId}-label`}>{label}</div>}
            <textarea
              data-testid={`${testId}-editor`}
              value={value}
              placeholder={
                typeof placeholder === 'string' ? placeholder : undefined
              }
              readOnly={readOnly}
              data-syntax={currentSyntax}
              onChange={(e) => onChange?.(e.target.value)}
            />
            {counter && (
              <span data-testid={`${testId}-counter`}>
                {(value || '').length}/{counter.limit}
              </span>
            )}
            {description && (
              <div data-testid={`${testId}-description`}>{description}</div>
            )}
            {errorText && (
              <div data-testid={`${testId}-error`}>{errorText}</div>
            )}
          </div>
        );
      },
    ),
  }));
};

export const mockCodeAreaMinimal = () => {
  jest.mock('@synerise/ds-code-area', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
