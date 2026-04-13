import React from 'react';

type MockButtonGroupProps = {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

type MockButtonDividerProps = {
  'data-testid'?: string;
};

/**
 * Factory function for ButtonGroup mock.
 * Mocks the entire @synerise/ds-button-group package including ButtonGroup and ButtonDivider.
 *
 * @example
 * ```typescript
 * import { buttonGroupMockFactory } from '@synerise/ds-mocks/ButtonGroup/vi';
 *
 * vi.mock('@synerise/ds-button-group', buttonGroupMockFactory);
 * ```
 */
export const buttonGroupMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      className,
      'data-testid': dataTestId,
    }: MockButtonGroupProps) => (
      <div data-testid={dataTestId || 'ds-button-group'} className={className}>
        {children}
      </div>
    ),
  ),
  ButtonDivider: vi.fn(
    ({ 'data-testid': dataTestId }: MockButtonDividerProps) => (
      <hr data-testid={dataTestId || 'ds-button-divider'} />
    ),
  ),
});

/**
 * Factory function for minimal ButtonGroup mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-button-group', buttonGroupMinimalMockFactory);
 * ```
 */
export const buttonGroupMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  ButtonDivider: vi.fn(() => null),
});
