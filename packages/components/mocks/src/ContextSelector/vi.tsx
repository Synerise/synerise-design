import React from 'react';

type MockContextSelectorProps = {
  children?: React.ReactNode;
  value?: unknown;
  onChange?: (value: unknown) => void;
  className?: string;
  'data-testid'?: string;
};

/**
 * Factory function for ContextSelector mock.
 * Mocks the @synerise/ds-context-selector package.
 *
 * @example
 * ```typescript
 * import { contextSelectorMockFactory } from '@synerise/ds-mocks/ContextSelector/vi';
 *
 * vi.mock('@synerise/ds-context-selector', contextSelectorMockFactory);
 * ```
 */
export const contextSelectorMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      value: _value,
      onChange: _onChange,
      className,
      'data-testid': dataTestId,
    }: MockContextSelectorProps) => (
      <div
        data-testid={dataTestId || 'ds-context-selector'}
        className={className}
      >
        {children}
      </div>
    ),
  ),
});

/**
 * Factory function for minimal ContextSelector mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-context-selector', contextSelectorMinimalMockFactory);
 * ```
 */
export const contextSelectorMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
