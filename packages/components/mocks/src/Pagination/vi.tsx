import type { PaginationProps } from 'antd/lib/pagination';
import React from 'react';

export type MockPaginationProps = PaginationProps & {
  'data-testid'?: string;
};

export const paginationMockFactory = () => ({
  default: vi.fn(
    ({
      className,
      current,
      total,
      pageSize,
      onChange,
      'data-testid': dataTestId,
    }: MockPaginationProps) => (
      <div
        className={`ds-pagination ${className || ''}`}
        data-testid={dataTestId || 'ds-pagination'}
        data-current={current}
        data-total={total}
        data-page-size={pageSize}
      >
        {total !== undefined && pageSize !== undefined && onChange && (
          <>
            <button
              data-testid={`${dataTestId || 'ds-pagination'}-prev`}
              onClick={() =>
                onChange(Math.max(1, (current || 1) - 1), pageSize)
              }
              disabled={current === 1}
            >
              Prev
            </button>
            <span>{current}</span>
            <button
              data-testid={`${dataTestId || 'ds-pagination'}-next`}
              onClick={() => onChange((current || 1) + 1, pageSize)}
              disabled={
                current !== undefined &&
                total !== undefined &&
                current * pageSize >= total
              }
            >
              Next
            </button>
          </>
        )}
      </div>
    ),
  ),
});

export const paginationMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
