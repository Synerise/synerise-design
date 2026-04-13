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

export const mockDatePicker = () => {
  jest.mock('@synerise/ds-date-picker', () => {
    const DatePicker = jest.fn(
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
      jest.fn(
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
      __esModule: true,
      default: DatePicker,
      RawDatePicker: DatePicker,
      DayPicker: createSubPicker('day-picker'),
      MonthPicker: createSubPicker('month-picker'),
      YearPicker: createSubPicker('year-picker'),
      TimePicker: createSubPicker('time-picker'),
    };
  });
};

export const mockDatePickerMinimal = () => {
  jest.mock('@synerise/ds-date-picker', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    RawDatePicker: jest.fn(() => null),
    DayPicker: jest.fn(() => null),
    MonthPicker: jest.fn(() => null),
    YearPicker: jest.fn(() => null),
    TimePicker: jest.fn(() => null),
  }));
};
