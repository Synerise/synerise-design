import React from 'react';

import type { FlagProps } from '@synerise/ds-flag';

export type MockFlagProps = FlagProps & {
  'data-testid'?: string;
};

export const flagMockFactory = () => ({
  default: vi.fn(
    ({ country, className, 'data-testid': dataTestId }: MockFlagProps) => (
      <span
        className={`ds-flag ${className || ''}`}
        data-testid={dataTestId || 'ds-flag'}
        data-country={country}
      />
    ),
  ),
  countryCodes: [],
});

export const flagMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  countryCodes: [],
});
