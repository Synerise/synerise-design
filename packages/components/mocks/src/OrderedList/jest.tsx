import React from 'react';

import type { OrderedListProps } from '@synerise/ds-ordered-list';

export type MockOrderedListProps = OrderedListProps & {
  'data-testid'?: string;
};

export const mockOrderedList = () => {
  jest.mock('@synerise/ds-ordered-list', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        data,
        children,
        className,
        'data-testid': dataTestId,
      }: MockOrderedListProps) => (
        <ol
          className={`ds-ordered-list ${className || ''}`}
          data-testid={dataTestId || 'ds-ordered-list'}
        >
          {data?.map((item: unknown, index: number) => (
            <li key={index}>{String(item)}</li>
          ))}
          {children}
        </ol>
      ),
    ),
  }));
};

export const mockOrderedListMinimal = () => {
  jest.mock('@synerise/ds-ordered-list', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
