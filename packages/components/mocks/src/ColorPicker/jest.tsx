import React from 'react';

import type { ColorPickerProps } from '@synerise/ds-color-picker';

export type MockColorPickerProps = ColorPickerProps & {
  'data-testid'?: string;
};

export const mockColorPicker = () => {
  jest.mock('@synerise/ds-color-picker', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        value,
        onChange: _onChange,
        className,
        'data-testid': dataTestId,
      }: MockColorPickerProps) => (
        <div
          className={`ds-color-picker ${className || ''}`}
          data-testid={dataTestId || 'ds-color-picker'}
        >
          {value}
        </div>
      ),
    ),
  }));
};

export const mockColorPickerMinimal = () => {
  jest.mock('@synerise/ds-color-picker', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
