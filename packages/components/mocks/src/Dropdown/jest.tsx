import React from 'react';

import type { DropdownProps } from '@synerise/ds-dropdown';

export type MockDropdownProps = DropdownProps & {
  'data-testid'?: string;
};

export const mockDropdown = () => {
  jest.mock('@synerise/ds-dropdown', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        overlay,
        open,
        onOpenChange,
        disabled,
        'data-testid': dataTestId,
      }: MockDropdownProps) => {
        const testId = dataTestId || 'ds-dropdown';

        return (
          <div data-testid={testId} className="ds-dropdown">
            <div
              data-testid={`${testId}-trigger`}
              onClick={() => !disabled && onOpenChange?.(!open)}
            >
              {children}
            </div>
            {open && <div data-testid={`${testId}-overlay`}>{overlay}</div>}
          </div>
        );
      },
    ),
  }));
};

export const mockDropdownMinimal = () => {
  jest.mock('@synerise/ds-dropdown', () => ({
    __esModule: true,
    default: jest.fn(({ children }: MockDropdownProps) => <>{children}</>),
  }));
};
