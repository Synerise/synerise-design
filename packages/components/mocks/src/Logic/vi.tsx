import React from 'react';

type MockLogicProps = {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

type MockMatchingProps = {
  value?: unknown;
  onChange?: (value: unknown) => void;
  texts?: Record<string, string>;
  'data-testid'?: string;
};

type MockPlaceholderProps = {
  children?: React.ReactNode;
  'data-testid'?: string;
};

/**
 * Factory function for Logic mock.
 * Mocks the entire @synerise/ds-logic package including Logic (with Logic.Matching compound), Matching, and Placeholder.
 *
 * @example
 * ```typescript
 * import { logicMockFactory } from '@synerise/ds-mocks/Logic/vi';
 *
 * vi.mock('@synerise/ds-logic', logicMockFactory);
 * ```
 */
export const logicMockFactory = () => {
  const Matching = vi.fn(
    ({
      value,
      onChange: _onChange,
      texts,
      'data-testid': dataTestId,
    }: MockMatchingProps) => (
      <div
        data-testid={dataTestId || 'ds-logic-matching'}
        data-value={
          value !== null && value !== undefined ? String(value) : undefined
        }
      >
        {texts && Object.values(texts).join(', ')}
      </div>
    ),
  );

  const Placeholder = vi.fn(
    ({ children, 'data-testid': dataTestId }: MockPlaceholderProps) => (
      <div data-testid={dataTestId || 'ds-logic-placeholder'}>{children}</div>
    ),
  );

  const Logic = Object.assign(
    vi.fn(
      ({ children, className, 'data-testid': dataTestId }: MockLogicProps) => (
        <div data-testid={dataTestId || 'ds-logic'} className={className}>
          {children}
        </div>
      ),
    ),
    { Matching },
  );

  return {
    default: Logic,
    Matching,
    Placeholder,
  };
};

/**
 * Factory function for minimal Logic mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-logic', logicMinimalMockFactory);
 * ```
 */
export const logicMinimalMockFactory = () => {
  const Matching = vi.fn(() => null);

  const Logic = Object.assign(
    vi.fn(() => null),
    { Matching },
  );

  return {
    default: Logic,
    Matching,
    Placeholder: vi.fn(() => null),
  };
};
