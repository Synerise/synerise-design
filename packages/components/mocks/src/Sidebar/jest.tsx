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

export const mockSidebar = () => {
  jest.mock('@synerise/ds-sidebar', () => {
    const Panel = jest.fn(
      ({ children, 'data-testid': dataTestId }: SidebarPanelProps) => (
        <div data-testid={dataTestId || 'ds-sidebar-panel'}>{children}</div>
      ),
    );

    const SidebarWithButton = jest.fn(
      ({ children, 'data-testid': dataTestId }: SidebarWithButtonProps) => (
        <div data-testid={dataTestId || 'ds-sidebar-with-button'}>
          {children}
        </div>
      ),
    );

    const Sidebar = Object.assign(
      jest.fn(
        ({ children, className, 'data-testid': dataTestId }: SidebarProps) => (
          <div data-testid={dataTestId || 'ds-sidebar'} className={className}>
            {children}
          </div>
        ),
      ),
      { Panel, SidebarWithButton },
    );

    return {
      __esModule: true,
      default: Sidebar,
      SidebarWithButton,
    };
  });
};
