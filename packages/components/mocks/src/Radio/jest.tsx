import React from 'react';

type MockRadioProps = {
  children?: React.ReactNode;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  value?: unknown;
  label?: React.ReactNode;
  description?: React.ReactNode;
  onChange?: (e: unknown) => void;
  'data-testid'?: string;
};

type MockRadioGroupProps = {
  children?: React.ReactNode;
  options?: Array<string | { label: React.ReactNode; value: unknown }>;
  value?: unknown;
  defaultValue?: unknown;
  onChange?: (e: unknown) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  big?: boolean;
  'data-testid'?: string;
};

type MockRadioButtonProps = {
  children?: React.ReactNode;
  value?: unknown;
  disabled?: boolean;
  'data-testid'?: string;
};

export const mockRadio = () => {
  jest.mock('@synerise/ds-radio', () => {
    const Group = jest.fn(
      ({
        children,
        options,
        value,
        onChange,
        disabled,
        fullWidth,
        'data-testid': dataTestId,
      }: MockRadioGroupProps) => {
        const testId = dataTestId || 'ds-radio-group';
        return (
          <div
            data-testid={testId}
            className="ds-radio-group"
            data-full-width={fullWidth}
          >
            {options
              ? options.map((opt, i) => {
                  const optValue = typeof opt === 'string' ? opt : opt.value;
                  const optLabel = typeof opt === 'string' ? opt : opt.label;
                  return (
                    <label key={i} data-testid={`${testId}-option-${i}`}>
                      <input
                        type="radio"
                        checked={value === optValue}
                        disabled={disabled}
                        onChange={() =>
                          onChange?.({ target: { value: optValue } })
                        }
                      />
                      {optLabel}
                    </label>
                  );
                })
              : children}
          </div>
        );
      },
    );

    const Button = jest.fn(
      ({
        children,
        value,
        disabled,
        'data-testid': dataTestId,
      }: MockRadioButtonProps) => (
        <button
          data-testid={dataTestId || 'ds-radio-button'}
          data-value={value}
          disabled={disabled}
        >
          {children}
        </button>
      ),
    );

    const Radio = Object.assign(
      jest.fn(
        ({
          children,
          className,
          checked,
          disabled,
          value,
          label,
          description,
          onChange,
          'data-testid': dataTestId,
        }: MockRadioProps) => {
          const testId = dataTestId || 'ds-radio';
          return (
            <div className={`ds-radio ${className || ''}`} data-testid={testId}>
              <label>
                <input
                  type="radio"
                  checked={checked}
                  disabled={disabled}
                  value={value}
                  onChange={onChange}
                />
                {label || children}
              </label>
              {description && (
                <div data-testid={`${testId}-description`}>{description}</div>
              )}
            </div>
          );
        },
      ),
      { Group, Button },
    );

    return {
      __esModule: true,
      default: Radio,
    };
  });
};

export const mockRadioMinimal = () => {
  jest.mock('@synerise/ds-radio', () => {
    const Radio = Object.assign(
      jest.fn(() => null),
      {
        Group: jest.fn(() => null),
        Button: jest.fn(() => null),
      },
    );

    return {
      __esModule: true,
      default: Radio,
    };
  });
};
