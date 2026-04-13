import React from 'react';

type MockNavbarProps = {
  children?: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
  'data-testid'?: string;
};

type MockNavbarDividerProps = {
  'data-testid'?: string;
};

export const mockNavbar = () => {
  jest.mock('@synerise/ds-navbar', () => {
    const Divider = jest.fn(
      ({ 'data-testid': dataTestId }: MockNavbarDividerProps) => (
        <hr data-testid={dataTestId || 'ds-navbar-divider'} />
      ),
    );

    const Navbar = Object.assign(
      jest.fn(
        ({
          children,
          className,
          description,
          'data-testid': dataTestId,
        }: MockNavbarProps) => {
          const testId = dataTestId || 'ds-navbar';
          return (
            <div data-testid={testId} className={className}>
              {description && (
                <div data-testid={`${testId}-description`}>{description}</div>
              )}
              {children}
            </div>
          );
        },
      ),
      { Divider },
    );

    return {
      __esModule: true,
      default: Navbar,
    };
  });
};

export const mockNavbarMinimal = () => {
  jest.mock('@synerise/ds-navbar', () => {
    const Navbar = Object.assign(
      jest.fn(() => null),
      { Divider: jest.fn(() => null) },
    );

    return {
      __esModule: true,
      default: Navbar,
    };
  });
};
