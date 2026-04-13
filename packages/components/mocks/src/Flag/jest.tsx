import React from 'react';

import type { FlagProps } from '@synerise/ds-flag';

export type MockFlagProps = FlagProps & {
  'data-testid'?: string;
};

export const mockFlag = () => {
  jest.mock('@synerise/ds-flag', () => ({
    __esModule: true,
    default: jest.fn(
      ({ country, className, 'data-testid': dataTestId }: MockFlagProps) => (
        <span
          className={`ds-flag ${className || ''}`}
          data-testid={dataTestId || 'ds-flag'}
          data-country={country}
        />
      ),
    ),
    countryCodes: [],
  }));
};

export const mockFlagMinimal = () => {
  jest.mock('@synerise/ds-flag', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    countryCodes: [],
  }));
};
