import React from 'react';

type MockColumnManagerProps = {
  children?: React.ReactNode;
  visible?: boolean;
  columns?: unknown[];
  onApply?: (columns: unknown[]) => void;
  hide?: () => void;
  draggable?: boolean;
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
        columns,
        onApply,
        hide,
        draggable,
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
            data-draggable={draggable}
          >
            {children}
            {onApply && (
              <button
                data-testid={`${testId}-apply`}
                onClick={() => onApply(columns || [])}
              >
                Apply
              </button>
            )}
            {hide && (
              <button data-testid={`${testId}-cancel`} onClick={hide}>
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
