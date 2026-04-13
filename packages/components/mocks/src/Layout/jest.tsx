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

export const mockLayout = () => {
  jest.mock('@synerise/ds-layout', () => ({
    __esModule: true,
    default: jest.fn(
      ({ children, className, 'data-testid': dataTestId }: MockLayoutProps) => (
        <div data-testid={dataTestId || 'ds-layout'} className={className}>
          {children}
        </div>
      ),
    ),
    Page: jest.fn(
      ({ children, className, 'data-testid': dataTestId }: MockPageProps) => (
        <div data-testid={dataTestId || 'ds-page'} className={className}>
          {children}
        </div>
      ),
    ),
  }));
};

export const mockLayoutMinimal = () => {
  jest.mock('@synerise/ds-layout', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    Page: jest.fn(() => null),
  }));
};
