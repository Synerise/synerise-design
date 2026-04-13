import React from 'react';

export type MockSearchBarProps = {
  children?: React.ReactNode;
  className?: string;
  placeholder?: string;
  value?: string;
  onSearchChange?: (value: string) => void;
  onClearInput?: () => void;
  'data-testid'?: string;
};

export const searchBarMockFactory = () => ({
  default: vi.fn(
    ({
      className,
      placeholder,
      value,
      onSearchChange,
      onClearInput,
      'data-testid': dataTestId,
    }: MockSearchBarProps) => {
      const testId = dataTestId || 'ds-search-bar';
      return (
        <div
          className={`ds-search-bar ${className || ''}`}
          data-testid={testId}
        >
          <input
            data-testid={`${testId}-input`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
          {value && (
            <button data-testid={`${testId}-clear`} onClick={onClearInput}>
              Clear
            </button>
          )}
        </div>
      );
    },
  ),
});

export const searchBarMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
