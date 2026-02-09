import React from 'react';

import type { DropdownProps } from '@synerise/ds-dropdown';

export type MockDropdownProps = DropdownProps & {
  'data-testid'?: string;
};

/**
 * Factory function for Dropdown mock.
 * Use directly with vi.mock() to avoid hoisting issues.
 *
 * @example
 * ```typescript
 * import { dropdownMockFactory } from '@synerise/ds-mocks/Dropdown/vi';
 *
 * vi.mock('@synerise/ds-dropdown', dropdownMockFactory);
 * ```
 */
export const dropdownMockFactory = () => ({
  default: vi.fn(
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
});

/**
 * Factory function for minimal Dropdown mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-dropdown', dropdownMinimalMockFactory);
 * ```
 */
export const dropdownMinimalMockFactory = () => ({
  default: vi.fn(({ children }: MockDropdownProps) => <>{children}</>),
});
