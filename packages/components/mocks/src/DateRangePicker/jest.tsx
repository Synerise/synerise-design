import React from 'react';

type MockDateRangePickerProps = {
  value?: unknown;
  onChange?: (value: unknown) => void;
  onApply?: (value: unknown) => void;
  placeholder?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  'data-testid'?: string;
};

type MockFilterProps = {
  children?: React.ReactNode;
  'data-testid'?: string;
};

export const mockDateRangePicker = () => {
  jest.mock('@synerise/ds-date-range-picker', () => {
    const createRangePicker = (defaultTestId: string) =>
      jest.fn(
        ({
          value,
          onChange,
          onApply,
          placeholder,
          disabled,
          'data-testid': dataTestId,
        }: MockDateRangePickerProps) => {
          const testId = dataTestId || defaultTestId;
          return (
            <div
              data-testid={testId}
              className={defaultTestId}
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
                value={
                  value !== null && value !== undefined ? String(value) : ''
                }
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

    const createFilter = (name: string) =>
      jest.fn(({ children, 'data-testid': dataTestId }: MockFilterProps) => {
        const testId = dataTestId || `ds-${name}`;
        return (
          <div data-testid={testId} className={`ds-${name}`}>
            {children}
          </div>
        );
      });

    return {
      __esModule: true,
      default: createRangePicker('ds-date-range-picker'),
      RawDateRangePicker: createRangePicker('ds-raw-date-range-picker'),
      DailyDateFilter: createFilter('daily-date-filter'),
      WeeklyDateFilter: createFilter('weekly-date-filter'),
      MonthlyDateFilter: createFilter('monthly-date-filter'),
      TimeWindow: createFilter('time-window'),
      utils: {},
      CONST: {},
      fnsFormat: jest.fn((date: unknown, _format: unknown) => String(date)),
      getDisabledTimeOptions: jest.fn((): number[] => []),
      isSinceRange: jest.fn(
        (range?: { type?: unknown; offset?: { type?: unknown } }) =>
          range?.type === 'RELATIVE' && range.offset?.type === 'SINCE',
      ),
      DEFAULT_RANGE_START: '00:00:00.000',
      DEFAULT_RANGE_END: '23:59:59.999',
      DAYS_OF_PERIOD_ENUM: { DAY_OF_MONTH: 'MONTH', DAY_OF_WEEK: 'WEEK' },
      COUNTED_FROM_ENUM: { BEGINNING: 'BEGINNING', ENDING: 'ENDING' },
      MONTH_DAYS: jest.fn(() => []),
      FORM_MODES: { HOUR: 'Hour', RANGE: 'Range' },
      EU_NOTATION_WEEK_DAYS_INDEXES: [0, 1, 2, 3, 4, 5, 6],
      US_NOTATION_WEEK_DAYS_INDEXES: [6, 0, 1, 2, 3, 4, 5],
      RANGE_DISPLAY_MODES: { TIMEPICKER: 'timepicker', SLIDER: 'slider' },
    };
  });
};

export const mockDateRangePickerMinimal = () => {
  jest.mock('@synerise/ds-date-range-picker', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    RawDateRangePicker: jest.fn(() => null),
    DailyDateFilter: jest.fn(() => null),
    WeeklyDateFilter: jest.fn(() => null),
    MonthlyDateFilter: jest.fn(() => null),
    TimeWindow: jest.fn(() => null),
    utils: {},
    CONST: {},
    fnsFormat: jest.fn((date: unknown, _format: unknown) => String(date)),
    getDisabledTimeOptions: jest.fn((): number[] => []),
    isSinceRange: jest.fn(
      (range?: { type?: unknown; offset?: { type?: unknown } }) =>
        range?.type === 'RELATIVE' && range.offset?.type === 'SINCE',
    ),
    DEFAULT_RANGE_START: '00:00:00.000',
    DEFAULT_RANGE_END: '23:59:59.999',
    DAYS_OF_PERIOD_ENUM: { DAY_OF_MONTH: 'MONTH', DAY_OF_WEEK: 'WEEK' },
    COUNTED_FROM_ENUM: { BEGINNING: 'BEGINNING', ENDING: 'ENDING' },
    MONTH_DAYS: jest.fn(() => []),
    FORM_MODES: { HOUR: 'Hour', RANGE: 'Range' },
    EU_NOTATION_WEEK_DAYS_INDEXES: [0, 1, 2, 3, 4, 5, 6],
    US_NOTATION_WEEK_DAYS_INDEXES: [6, 0, 1, 2, 3, 4, 5],
    RANGE_DISPLAY_MODES: { TIMEPICKER: 'timepicker', SLIDER: 'slider' },
  }));
};
