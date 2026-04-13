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

/**
 * Factory function for Drawer mock.
 * Mocks the entire @synerise/ds-drawer package including Drawer and all static sub-components.
 *
 * @example
 * ```typescript
 * import { drawerMockFactory } from '@synerise/ds-mocks/Drawer/vi';
 *
 * vi.mock('@synerise/ds-drawer', drawerMockFactory);
 * ```
 */
export const drawerMockFactory = () => {
  const DrawerHeader = vi.fn(
    ({
      children,
      className,
      'data-testid': dataTestId,
    }: MockDrawerSubProps) => (
      <div className={className} data-testid={dataTestId || 'ds-drawer-header'}>
        {children}
      </div>
    ),
  );

  const DrawerHeaderWithoutPadding = vi.fn(
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

  const DrawerHeaderBar = vi.fn(
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

  const DrawerHeaderBack = vi.fn(
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

  const DrawerBody = vi.fn(
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

  const DrawerContent = vi.fn(
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
    vi.fn(
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

  return { default: Drawer };
};

/**
 * Factory function for minimal Drawer mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-drawer', drawerMinimalMockFactory);
 * ```
 */
export const drawerMinimalMockFactory = () => {
  const Drawer = Object.assign(
    vi.fn(() => null),
    {
      DrawerHeader: vi.fn(() => null),
      DrawerHeaderWithoutPadding: vi.fn(() => null),
      DrawerHeaderBar: vi.fn(() => null),
      DrawerHeaderBack: vi.fn(() => null),
      DrawerBody: vi.fn(() => null),
      DrawerContent: vi.fn(() => null),
    },
  );

  return { default: Drawer };
};
