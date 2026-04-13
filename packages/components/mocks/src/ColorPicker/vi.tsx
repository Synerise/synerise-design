import React from 'react';

import type { ColorPickerProps } from '@synerise/ds-color-picker';

export type MockColorPickerProps = ColorPickerProps & {
  'data-testid'?: string;
};

export const colorPickerMockFactory = () => ({
  default: vi.fn(
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
});

export const colorPickerMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
