import React from 'react';

import type { IconPickerProps } from '@synerise/ds-icon-picker';

export type MockIconPickerProps = IconPickerProps & {
  'data-testid'?: string;
};

export const mockIconPicker = () => {
  jest.mock('@synerise/ds-icon-picker', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        value,
        onChange,
        'data-testid': dataTestId,
      }: MockIconPickerProps) => (
        <div
          className={`ds-icon-picker ${className || ''}`}
          data-testid={dataTestId || 'ds-icon-picker'}
          data-value={value}
          onClick={() => onChange?.(value as never)}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockIconPickerMinimal = () => {
  jest.mock('@synerise/ds-icon-picker', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
