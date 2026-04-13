import React from 'react';

type MockDatePickerProps = {
  value?: unknown;
  onChange?: (value: unknown) => void;
  onApply?: (value: unknown) => void;
  placeholder?: string;
  format?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  'data-testid'?: string;
};

type MockSubPickerProps = {
  value?: unknown;
  onChange?: (value: unknown) => void;
  'data-testid'?: string;
};

/**
 * Factory function for DatePicker mock.
 * Mocks the entire @synerise/ds-date-picker package including DatePicker, RawDatePicker,
 * DayPicker, MonthPicker, YearPicker, and TimePicker.
 *
 * @example
 * ```typescript
 * import { datePickerMockFactory } from '@synerise/ds-mocks/DatePicker/vi';
 *
 * vi.mock('@synerise/ds-date-picker', datePickerMockFactory);
 * ```
 */
export const datePickerMockFactory = () => {
  const DatePicker = vi.fn(
    ({
      value,
      onChange,
      onApply,
      placeholder,
      format: _format,
      disabled,
      'data-testid': dataTestId,
    }: MockDatePickerProps) => {
      const testId = dataTestId || 'ds-date-picker';
      return (
        <div
          data-testid={testId}
          className="ds-date-picker"
          data-disabled={disabled}
        >
          {value !== null && value !== undefined && (
            <div data-testid={`${testId}-value`}>{String(value)}</div>
          )}
          {placeholder && !value && (
            <div data-testid={`${testId}-placeholder`}>{placeholder}</div>
          )}
          <input
            data-testid={`${testId}-input`}
            type="text"
            value={value !== null && value !== undefined ? String(value) : ''}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
          />
          {onApply && (
            <button
              data-testid={`${testId}-apply`}
              onClick={() => onApply(value)}
            >
              Apply
            </button>
          )}
        </div>
      );
    },
  );

  const createSubPicker = (name: string) =>
    vi.fn(
      ({
        value,
        onChange: _onChange,
        'data-testid': dataTestId,
      }: MockSubPickerProps) => {
        const testId = dataTestId || `ds-${name}`;
        return (
          <div data-testid={testId} className={`ds-${name}`}>
            {value !== null && value !== undefined && (
              <div data-testid={`${testId}-value`}>{String(value)}</div>
            )}
          </div>
        );
      },
    );

  return {
    default: DatePicker,
    RawDatePicker: DatePicker,
    DayPicker: createSubPicker('day-picker'),
    MonthPicker: createSubPicker('month-picker'),
    YearPicker: createSubPicker('year-picker'),
    TimePicker: createSubPicker('time-picker'),
  };
};

/**
 * Factory function for minimal DatePicker mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-date-picker', datePickerMinimalMockFactory);
 * ```
 */
export const datePickerMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  RawDatePicker: vi.fn(() => null),
  DayPicker: vi.fn(() => null),
  MonthPicker: vi.fn(() => null),
  YearPicker: vi.fn(() => null),
  TimePicker: vi.fn(() => null),
});
