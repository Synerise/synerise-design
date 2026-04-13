import React from 'react';

import type { SidebarObjectProps } from '@synerise/ds-sidebar-object';

export type MockSidebarObjectProps = SidebarObjectProps & {
  'data-testid'?: string;
};

export const mockSidebarObject = () => {
  jest.mock('@synerise/ds-sidebar-object', () => ({
    __esModule: true,
    default: jest.fn(
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
  }));
};

export const mockSidebarObjectMinimal = () => {
  jest.mock('@synerise/ds-sidebar-object', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
