import React from 'react';

import type { InsightProps } from '@synerise/ds-insight';

export type MockInsightProps = InsightProps & {
  'data-testid'?: string;
};

export const insightMockFactory = () => ({
  default: vi.fn(
    ({ children, className, 'data-testid': dataTestId }: MockInsightProps) => (
      <div
        className={`ds-insight ${className || ''}`}
        data-testid={dataTestId || 'ds-insight'}
      >
        {children}
      </div>
    ),
  ),
});

export const insightMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
