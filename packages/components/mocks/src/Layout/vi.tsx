import React from 'react';

type MockLayoutProps = {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

type MockPageProps = {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

/**
 * Factory function for Layout mock.
 * Mocks the entire @synerise/ds-layout package including Layout and Page.
 *
 * @example
 * ```typescript
 * import { layoutMockFactory } from '@synerise/ds-mocks/Layout/vi';
 *
 * vi.mock('@synerise/ds-layout', layoutMockFactory);
 * ```
 */
export const layoutMockFactory = () => ({
  default: vi.fn(
    ({ children, className, 'data-testid': dataTestId }: MockLayoutProps) => (
      <div data-testid={dataTestId || 'ds-layout'} className={className}>
        {children}
      </div>
    ),
  ),
  Page: vi.fn(
    ({ children, className, 'data-testid': dataTestId }: MockPageProps) => (
      <div data-testid={dataTestId || 'ds-page'} className={className}>
        {children}
      </div>
    ),
  ),
});

/**
 * Factory function for minimal Layout mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-layout', layoutMinimalMockFactory);
 * ```
 */
export const layoutMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  Page: vi.fn(() => null),
});
