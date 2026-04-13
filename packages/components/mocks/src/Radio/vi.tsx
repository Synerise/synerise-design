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

/**
 * Factory function for Radio mock.
 * Use directly with vi.mock() to avoid hoisting issues.
 *
 * @example
 * ```typescript
 * import { radioMockFactory } from '@synerise/ds-mocks/Radio/vi';
 *
 * vi.mock('@synerise/ds-radio', radioMockFactory);
 * ```
 */
export const radioMockFactory = () => {
  const Group = vi.fn(
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

  const Button = vi.fn(
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
    vi.fn(
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

  return { default: Radio };
};

/**
 * Factory function for minimal Radio mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-radio', radioMinimalMockFactory);
 * ```
 */
export const radioMinimalMockFactory = () => {
  const Radio = Object.assign(
    vi.fn(() => null),
    {
      Group: vi.fn(() => null),
      Button: vi.fn(() => null),
    },
  );

  return { default: Radio };
};
