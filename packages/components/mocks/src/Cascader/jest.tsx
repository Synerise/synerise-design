import React, { type ReactNode } from 'react';

type CascaderProps = {
  children?: ReactNode;
  rootCategory?: unknown;
  path?: unknown[];
  onPathChange?: (...args: unknown[]) => void;
  'data-testid'?: string;
};

type BreadcrumbProps = {
  path?: unknown[];
  children?: ReactNode;
  'data-testid'?: string;
};

export const mockCascader = () => {
  jest.mock('@synerise/ds-cascader', () => {
    const Cascader = jest.fn(
      ({ children, 'data-testid': dataTestId }: CascaderProps) => (
        <div data-testid={dataTestId || 'ds-cascader'}>{children}</div>
      ),
    );

    const Breadcrumb = jest.fn(
      ({ children, 'data-testid': dataTestId }: BreadcrumbProps) => (
        <div data-testid={dataTestId || 'ds-cascader-breadcrumb'}>
          {children}
        </div>
      ),
    );

    return {
      __esModule: true,
      default: Cascader,
      Breadcrumb,
    };
  });
};
