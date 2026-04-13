import React from 'react';

import type { FormatPickerProps } from '@synerise/ds-format-picker';

export type MockFormatPickerProps = FormatPickerProps & {
  'data-testid'?: string;
};

export const formatPickerMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      className,
      value,
      onChange,
      'data-testid': dataTestId,
    }: MockFormatPickerProps) => (
      <div
        className={`ds-format-picker ${className || ''}`}
        data-testid={dataTestId || 'ds-format-picker'}
        data-value={value}
        onClick={() => onChange?.(value as never)}
      >
        {children}
      </div>
    ),
  ),
});

export const formatPickerMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
