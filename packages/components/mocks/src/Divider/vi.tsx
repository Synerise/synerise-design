import React from 'react';

type MockDividerProps = {
  className?: string;
  dashed?: boolean;
  'data-testid'?: string;
};

export const dividerMockFactory = () => ({
  default: vi.fn(
    ({ className, dashed, 'data-testid': dataTestId }: MockDividerProps) => (
      <hr
        className={`ds-divider ${className || ''}`}
        data-testid={dataTestId || 'ds-divider'}
        data-dashed={dashed}
      />
    ),
  ),
});

export const dividerMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
