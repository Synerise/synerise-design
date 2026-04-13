import React from 'react';

export type MockTimePickerProps = {
  value?: unknown;
  onChange?: (...args: unknown[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  'data-testid'?: string;
};

export const mockTimePicker = () => {
  jest.mock('@synerise/ds-time-picker', () => ({
    __esModule: true,
    default: jest.fn(
      ({ className, 'data-testid': dataTestId }: MockTimePickerProps) => (
        <div
          className={`ds-time-picker ${className || ''}`}
          data-testid={dataTestId || 'ds-time-picker'}
        />
      ),
    ),
    AM: 'AM',
    PM: 'PM',
    HOUR_12: 12,
    HOUR: 24,
    CLOCK_MODES: {},
  }));
};

export const mockTimePickerMinimal = () => {
  jest.mock('@synerise/ds-time-picker', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    AM: 'AM',
    PM: 'PM',
    HOUR_12: 12,
    HOUR: 24,
    CLOCK_MODES: {},
  }));
};
