import React from 'react';

import type { UnorderedListProps } from '@synerise/ds-unordered-list';

export type MockUnorderedListProps = UnorderedListProps & {
  'data-testid'?: string;
};

export const unorderedListMockFactory = () => ({
  default: vi.fn(
    ({
      data,
      children,
      className,
      'data-testid': dataTestId,
    }: MockUnorderedListProps) => (
      <ul
        className={`ds-unordered-list ${className || ''}`}
        data-testid={dataTestId || 'ds-unordered-list'}
      >
        {data?.map((item: unknown, index: number) => (
          <li key={index}>{String(item)}</li>
        ))}
        {children}
      </ul>
    ),
  ),
});

export const unorderedListMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
