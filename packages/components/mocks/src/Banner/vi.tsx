import React from 'react';

import type { BannerProps } from '@synerise/ds-banner';

export type MockBannerProps = BannerProps & {
  'data-testid'?: string;
};

export const bannerMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      className,
      title,
      description,
      'data-testid': dataTestId,
    }: MockBannerProps) => (
      <div
        className={`ds-banner ${className || ''}`}
        data-testid={dataTestId || 'ds-banner'}
      >
        {title && (
          <div data-testid={`${dataTestId || 'ds-banner'}-title`}>{title}</div>
        )}
        {description && (
          <div data-testid={`${dataTestId || 'ds-banner'}-description`}>
            {description}
          </div>
        )}
        {children}
      </div>
    ),
  ),
});

export const bannerMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
