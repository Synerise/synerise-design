import React from 'react';

type MockAppMenuProps = {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

export const mockAppMenu = () => {
  jest.mock('@synerise/ds-app-menu', () => {
    const AppMenu = jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockAppMenuProps) => {
        const testId = dataTestId || 'ds-app-menu';
        return (
          <div
            data-testid={testId}
            className={`ds-app-menu ${className || ''}`}
          >
            {children}
          </div>
        );
      },
    );

    return {
      __esModule: true,
      default: AppMenu,
      useMenu: jest.fn(() => ({
        isOpen: false,
        toggle: jest.fn(),
        close: jest.fn(),
        open: jest.fn(),
      })),
      useSubMenu: jest.fn(() => ({
        isOpen: false,
        toggle: jest.fn(),
        close: jest.fn(),
        open: jest.fn(),
      })),
    };
  });
};

export const mockAppMenuMinimal = () => {
  jest.mock('@synerise/ds-app-menu', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    useMenu: jest.fn(() => ({
      isOpen: false,
      toggle: jest.fn(),
      close: jest.fn(),
      open: jest.fn(),
    })),
    useSubMenu: jest.fn(() => ({
      isOpen: false,
      toggle: jest.fn(),
      close: jest.fn(),
      open: jest.fn(),
    })),
  }));
};
