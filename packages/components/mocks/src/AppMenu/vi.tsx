import React from 'react';

type MockAppMenuProps = {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

/**
 * Factory function for AppMenu mock.
 * Mocks the entire @synerise/ds-app-menu package including AppMenu, useMenu, and useSubMenu.
 *
 * @example
 * ```typescript
 * import { appMenuMockFactory } from '@synerise/ds-mocks/AppMenu/vi';
 *
 * vi.mock('@synerise/ds-app-menu', appMenuMockFactory);
 * ```
 */
export const appMenuMockFactory = () => {
  const AppMenu = vi.fn(
    ({ children, className, 'data-testid': dataTestId }: MockAppMenuProps) => {
      const testId = dataTestId || 'ds-app-menu';
      return (
        <div data-testid={testId} className={`ds-app-menu ${className || ''}`}>
          {children}
        </div>
      );
    },
  );

  return {
    default: AppMenu,
    useMenu: vi.fn(() => ({
      isOpen: false,
      toggle: vi.fn(),
      close: vi.fn(),
      open: vi.fn(),
    })),
    useSubMenu: vi.fn(() => ({
      isOpen: false,
      toggle: vi.fn(),
      close: vi.fn(),
      open: vi.fn(),
    })),
  };
};

/**
 * Factory function for minimal AppMenu mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-app-menu', appMenuMinimalMockFactory);
 * ```
 */
export const appMenuMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  useMenu: vi.fn(() => ({
    isOpen: false,
    toggle: vi.fn(),
    close: vi.fn(),
    open: vi.fn(),
  })),
  useSubMenu: vi.fn(() => ({
    isOpen: false,
    toggle: vi.fn(),
    close: vi.fn(),
    open: vi.fn(),
  })),
});
