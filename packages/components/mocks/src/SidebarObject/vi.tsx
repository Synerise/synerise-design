import React from 'react';

import type { SidebarObjectProps } from '@synerise/ds-sidebar-object';

export type MockSidebarObjectProps = SidebarObjectProps & {
  'data-testid'?: string;
};

export const sidebarObjectMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      className,
      'data-testid': dataTestId,
    }: MockSidebarObjectProps) => (
      <div
        className={`ds-sidebar-object ${className || ''}`}
        data-testid={dataTestId || 'ds-sidebar-object'}
      >
        {children}
      </div>
    ),
  ),
});

export const sidebarObjectMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
