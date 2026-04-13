import React from 'react';

type MockColumnManagerProps = {
  children?: React.ReactNode;
  visible?: boolean;
  columns?: unknown[];
  onApply?: () => void;
  onCancel?: () => void;
  className?: string;
  'data-testid'?: string;
};

/**
 * Factory function for ColumnManager mock.
 * Mocks the @synerise/ds-column-manager package.
 *
 * @example
 * ```typescript
 * import { columnManagerMockFactory } from '@synerise/ds-mocks/ColumnManager/vi';
 *
 * vi.mock('@synerise/ds-column-manager', columnManagerMockFactory);
 * ```
 */
export const columnManagerMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      visible,
      columns: _columns,
      onApply,
      onCancel,
      className,
      'data-testid': dataTestId,
    }: MockColumnManagerProps) => {
      if (visible === false) {
        return null;
      }
      const testId = dataTestId || 'ds-column-manager';
      return (
        <div data-testid={testId} className={className} data-visible={visible}>
          {children}
          {onApply && (
            <button data-testid={`${testId}-apply`} onClick={onApply}>
              Apply
            </button>
          )}
          {onCancel && (
            <button data-testid={`${testId}-cancel`} onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      );
    },
  ),
});

/**
 * Factory function for minimal ColumnManager mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-column-manager', columnManagerMinimalMockFactory);
 * ```
 */
export const columnManagerMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
