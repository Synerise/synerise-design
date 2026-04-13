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

export const mockGrid = () => {
  jest.mock('@synerise/ds-grid', () => {
    const Item = jest.fn(
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
      jest.fn(
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
      __esModule: true,
      default: Grid,
    };
  });
};

export const mockGridMinimal = () => {
  jest.mock('@synerise/ds-grid', () => {
    const Grid = Object.assign(
      jest.fn(() => null),
      {
        Item: jest.fn(() => null),
      },
    );

    return {
      __esModule: true,
      default: Grid,
    };
  });
};
