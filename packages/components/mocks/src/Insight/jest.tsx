import React from 'react';

import type { InsightProps } from '@synerise/ds-insight';

export type MockInsightProps = InsightProps & {
  'data-testid'?: string;
};

export const mockInsight = () => {
  jest.mock('@synerise/ds-insight', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockInsightProps) => (
        <div
          className={`ds-insight ${className || ''}`}
          data-testid={dataTestId || 'ds-insight'}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockInsightMinimal = () => {
  jest.mock('@synerise/ds-insight', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
