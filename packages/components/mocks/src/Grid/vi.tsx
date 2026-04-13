import React from 'react';

type MockGridProps = {
  children?: React.ReactNode;
  className?: string;
  columns?: number;
  'data-testid'?: string;
};

type MockGridItemProps = {
  children?: React.ReactNode;
  span?: number;
  'data-testid'?: string;
};

/**
 * Factory function for Grid mock.
 * Mocks the entire @synerise/ds-grid package including Grid and Grid.Item.
 *
 * @example
 * ```typescript
 * import { gridMockFactory } from '@synerise/ds-mocks/Grid/vi';
 *
 * vi.mock('@synerise/ds-grid', gridMockFactory);
 * ```
 */
export const gridMockFactory = () => {
  const Item = vi.fn(
    ({ children, span, 'data-testid': dataTestId }: MockGridItemProps) => (
      <div
        data-testid={dataTestId || 'ds-grid-item'}
        data-span={span}
        className="ds-grid-item"
      >
        {children}
      </div>
    ),
  );

  const Grid = Object.assign(
    vi.fn(
      ({
        children,
        className,
        columns,
        'data-testid': dataTestId,
      }: MockGridProps) => {
        const testId = dataTestId || 'ds-grid';
        return (
          <div
            data-testid={testId}
            className={`ds-grid ${className || ''}`}
            data-columns={columns}
          >
            {children}
          </div>
        );
      },
    ),
    { Item },
  );

  return {
    default: Grid,
  };
};

/**
 * Factory function for minimal Grid mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-grid', gridMinimalMockFactory);
 * ```
 */
export const gridMinimalMockFactory = () => {
  const Grid = Object.assign(
    vi.fn(() => null),
    {
      Item: vi.fn(() => null),
    },
  );

  return {
    default: Grid,
  };
};
