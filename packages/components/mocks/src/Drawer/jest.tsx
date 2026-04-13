import React from 'react';

type MockDrawerProps = {
  children?: React.ReactNode;
  className?: string;
  open?: boolean;
  visible?: boolean;
  width?: string | number;
  placement?: string;
  onClose?: (e?: unknown) => void;
  'data-testid'?: string;
};

type MockDrawerSubProps = {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

export const mockDrawer = () => {
  jest.mock('@synerise/ds-drawer', () => {
    const DrawerHeader = jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockDrawerSubProps) => (
        <div
          className={className}
          data-testid={dataTestId || 'ds-drawer-header'}
        >
          {children}
        </div>
      ),
    );

    const DrawerHeaderWithoutPadding = jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockDrawerSubProps) => (
        <div
          className={className}
          data-testid={dataTestId || 'ds-drawer-header-no-padding'}
        >
          {children}
        </div>
      ),
    );

    const DrawerHeaderBar = jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockDrawerSubProps) => (
        <div
          className={className}
          data-testid={dataTestId || 'ds-drawer-header-bar'}
        >
          {children}
        </div>
      ),
    );

    const DrawerHeaderBack = jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockDrawerSubProps) => (
        <div
          className={className}
          data-testid={dataTestId || 'ds-drawer-header-back'}
        >
          {children}
        </div>
      ),
    );

    const DrawerBody = jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockDrawerSubProps) => (
        <div className={className} data-testid={dataTestId || 'ds-drawer-body'}>
          {children}
        </div>
      ),
    );

    const DrawerContent = jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockDrawerSubProps) => (
        <div
          className={className}
          data-testid={dataTestId || 'ds-drawer-content'}
        >
          {children}
        </div>
      ),
    );

    const Drawer = Object.assign(
      jest.fn(
        ({
          children,
          className,
          open,
          visible,
          width,
          placement,
          onClose,
          'data-testid': dataTestId,
        }: MockDrawerProps) => {
          const isOpen = open ?? visible;
          if (!isOpen) {
            return null;
          }
          const testId = dataTestId || 'ds-drawer';
          return (
            <div
              className={`ds-drawer ${className || ''}`}
              data-testid={testId}
              data-width={width}
              data-placement={placement}
            >
              <button data-testid={`${testId}-close`} onClick={onClose}>
                Close
              </button>
              {children}
            </div>
          );
        },
      ),
      {
        DrawerHeader,
        DrawerHeaderWithoutPadding,
        DrawerHeaderBar,
        DrawerHeaderBack,
        DrawerBody,
        DrawerContent,
      },
    );

    return {
      __esModule: true,
      default: Drawer,
    };
  });
};

export const mockDrawerMinimal = () => {
  jest.mock('@synerise/ds-drawer', () => {
    const Drawer = Object.assign(
      jest.fn(() => null),
      {
        DrawerHeader: jest.fn(() => null),
        DrawerHeaderWithoutPadding: jest.fn(() => null),
        DrawerHeaderBar: jest.fn(() => null),
        DrawerHeaderBack: jest.fn(() => null),
        DrawerBody: jest.fn(() => null),
        DrawerContent: jest.fn(() => null),
      },
    );

    return {
      __esModule: true,
      default: Drawer,
    };
  });
};
