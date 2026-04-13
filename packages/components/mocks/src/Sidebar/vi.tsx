import React, { type ReactNode } from 'react';

type SidebarProps = {
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
};

type SidebarPanelProps = {
  children?: ReactNode;
  'data-testid'?: string;
};

type SidebarWithButtonProps = {
  children?: ReactNode;
  'data-testid'?: string;
};

/**
 * Factory function for Sidebar mock.
 * Mocks the entire @synerise/ds-sidebar package including Sidebar, Sidebar.Panel, and SidebarWithButton.
 *
 * @example
 * ```typescript
 * import { sidebarMockFactory } from '@synerise/ds-mocks/Sidebar/vi';
 *
 * vi.mock('@synerise/ds-sidebar', sidebarMockFactory);
 * ```
 */
export const sidebarMockFactory = () => {
  const Panel = vi.fn(
    ({ children, 'data-testid': dataTestId }: SidebarPanelProps) => (
      <div data-testid={dataTestId || 'ds-sidebar-panel'}>{children}</div>
    ),
  );

  const SidebarWithButton = vi.fn(
    ({ children, 'data-testid': dataTestId }: SidebarWithButtonProps) => (
      <div data-testid={dataTestId || 'ds-sidebar-with-button'}>{children}</div>
    ),
  );

  const Sidebar = Object.assign(
    vi.fn(
      ({ children, className, 'data-testid': dataTestId }: SidebarProps) => (
        <div data-testid={dataTestId || 'ds-sidebar'} className={className}>
          {children}
        </div>
      ),
    ),
    { Panel, SidebarWithButton },
  );

  return {
    default: Sidebar,
    SidebarWithButton,
  };
};
