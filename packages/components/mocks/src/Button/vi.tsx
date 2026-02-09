import React from 'react';

import type { ButtonProps } from '@synerise/ds-button';

export type MockButtonProps = ButtonProps & {
  'data-testid'?: string;
};

/**
 * Factory function for Button mock.
 * Use directly with vi.mock() to avoid hoisting issues.
 *
 * @example
 * ```typescript
 * import { buttonMockFactory } from '@synerise/ds-mocks/Button/vi';
 *
 * vi.mock('@synerise/ds-button', buttonMockFactory);
 * ```
 */
export const buttonMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      onClick,
      type,
      mode,
      disabled,
      loading,
      className,
      'data-testid': dataTestId,
    }: MockButtonProps) => (
      <button
        className={`ds-button ${className || ''}`}
        data-testid={dataTestId || 'ds-button'}
        data-type={type}
        data-mode={mode}
        data-loading={!!loading}
        onClick={onClick}
        disabled={disabled || !!loading}
      >
        {loading ? 'Loading...' : children}
      </button>
    ),
  ),
});

/**
 * Factory function for minimal Button mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-button', buttonMinimalMockFactory);
 * ```
 */
export const buttonMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
