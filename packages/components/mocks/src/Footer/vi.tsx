import React from 'react';

import type { FooterProps } from '@synerise/ds-footer';

export type MockFooterProps = FooterProps & {
  'data-testid'?: string;
};

export const footerMockFactory = () => ({
  default: vi.fn(
    ({ children, className, 'data-testid': dataTestId }: MockFooterProps) => (
      <div
        className={`ds-footer ${className || ''}`}
        data-testid={dataTestId || 'ds-footer'}
      >
        {children}
      </div>
    ),
  ),
});

export const footerMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
