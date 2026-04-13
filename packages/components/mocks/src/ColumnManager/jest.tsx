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

export const mockColumnManager = () => {
  jest.mock('@synerise/ds-column-manager', () => ({
    __esModule: true,
    default: jest.fn(
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
          <div
            data-testid={testId}
            className={className}
            data-visible={visible}
          >
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
  }));
};

export const mockColumnManagerMinimal = () => {
  jest.mock('@synerise/ds-column-manager', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
