import React from 'react';

import type { MetricCardProps } from '@synerise/ds-metric-card';

export type MockMetricCardProps = MetricCardProps & {
  'data-testid'?: string;
};

export const metricCardMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      className,
      title,
      value,
      'data-testid': dataTestId,
    }: MockMetricCardProps) => (
      <div
        className={`ds-metric-card ${className || ''}`}
        data-testid={dataTestId || 'ds-metric-card'}
        data-title={title}
        data-value={value}
      >
        {children}
      </div>
    ),
  ),
});

export const metricCardMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
