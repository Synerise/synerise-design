import React, { type ReactNode } from 'react';

type CascaderProps = {
  children?: ReactNode;
  rootCategory?: unknown;
  path?: unknown[];
  onPathChange?: (...args: unknown[]) => void;
  'data-testid'?: string;
};

type BreadcrumbProps = {
  path?: unknown[];
  children?: ReactNode;
  'data-testid'?: string;
};

/**
 * Factory function for Cascader mock.
 * Mocks the entire @synerise/ds-cascader package including Cascader and Breadcrumb.
 *
 * @example
 * ```typescript
 * import { cascaderMockFactory } from '@synerise/ds-mocks/Cascader/vi';
 *
 * vi.mock('@synerise/ds-cascader', cascaderMockFactory);
 * ```
 */
export const cascaderMockFactory = () => {
  const Cascader = vi.fn(
    ({ children, 'data-testid': dataTestId }: CascaderProps) => (
      <div data-testid={dataTestId || 'ds-cascader'}>{children}</div>
    ),
  );

  const Breadcrumb = vi.fn(
    ({ children, 'data-testid': dataTestId }: BreadcrumbProps) => (
      <div data-testid={dataTestId || 'ds-cascader-breadcrumb'}>{children}</div>
    ),
  );

  return {
    default: Cascader,
    Breadcrumb,
  };
};
