import React from 'react';

type MockInlineEditProps = {
  input?: React.ReactNode;
  size?: string;
  style?: React.CSSProperties;
  className?: string;
  'data-testid'?: string;
};

type MockInlineSelectProps = {
  children?: React.ReactNode;
  placeholder?: string;
  size?: string;
  className?: string;
  'data-testid'?: string;
};

/**
 * Factory function for InlineEdit mock.
 * Mocks the entire @synerise/ds-inline-edit package including InlineEdit and InlineSelect.
 *
 * @example
 * ```typescript
 * import { inlineEditMockFactory } from '@synerise/ds-mocks/InlineEdit/vi';
 *
 * vi.mock('@synerise/ds-inline-edit', inlineEditMockFactory);
 * ```
 */
export const inlineEditMockFactory = () => {
  const InlineEdit = vi.fn(
    ({
      input,
      size,
      style,
      className,
      'data-testid': dataTestId,
    }: MockInlineEditProps) => {
      const testId = dataTestId || 'ds-inline-edit';
      return (
        <div
          data-testid={testId}
          className={className}
          style={style}
          data-size={size}
        >
          {input}
        </div>
      );
    },
  );

  const InlineSelect = vi.fn(
    ({
      children,
      placeholder,
      size,
      className,
      'data-testid': dataTestId,
    }: MockInlineSelectProps) => {
      const testId = dataTestId || 'ds-inline-select';
      return (
        <div
          data-testid={testId}
          className={className}
          data-size={size}
          data-placeholder={placeholder}
        >
          {children}
        </div>
      );
    },
  );

  return {
    default: InlineEdit,
    InlineSelect,
  };
};

/**
 * Factory function for minimal InlineEdit mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-inline-edit', inlineEditMinimalMockFactory);
 * ```
 */
export const inlineEditMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  InlineSelect: vi.fn(() => null),
});
