import React from 'react';

type MockDescriptionProps = {
  children?: React.ReactNode;
  rows?: unknown[];
  className?: string;
  'data-testid'?: string;
};

type MockDescriptionRowProps = {
  children?: React.ReactNode;
  label?: React.ReactNode;
  value?: React.ReactNode;
  'data-testid'?: string;
};

type MockDescriptionCopyableProps = {
  children?: React.ReactNode;
  value?: React.ReactNode;
  'data-testid'?: string;
};

/**
 * Factory function for Description mock.
 * Mocks the entire @synerise/ds-description package including Description, DescriptionRow, and DescriptionCopyable.
 *
 * @example
 * ```typescript
 * import { descriptionMockFactory } from '@synerise/ds-mocks/Description/vi';
 *
 * vi.mock('@synerise/ds-description', descriptionMockFactory);
 * ```
 */
export const descriptionMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      rows: _rows,
      className,
      'data-testid': dataTestId,
    }: MockDescriptionProps) => (
      <div
        data-testid={dataTestId || 'ds-description-component'}
        className={className}
      >
        {children}
      </div>
    ),
  ),
  DescriptionRow: vi.fn(
    ({
      children,
      label,
      value,
      'data-testid': dataTestId,
    }: MockDescriptionRowProps) => (
      <div data-testid={dataTestId || 'ds-description-row'}>
        {label && (
          <span data-testid={`${dataTestId || 'ds-description-row'}-label`}>
            {label}
          </span>
        )}
        {value && (
          <span data-testid={`${dataTestId || 'ds-description-row'}-value`}>
            {value}
          </span>
        )}
        {children}
      </div>
    ),
  ),
  DescriptionCopyable: vi.fn(
    ({
      children,
      value,
      'data-testid': dataTestId,
    }: MockDescriptionCopyableProps) => (
      <div data-testid={dataTestId || 'ds-description-copyable'}>
        {value && <span>{value}</span>}
        {children}
      </div>
    ),
  ),
});

/**
 * Factory function for minimal Description mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-description', descriptionMinimalMockFactory);
 * ```
 */
export const descriptionMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  DescriptionRow: vi.fn(() => null),
  DescriptionCopyable: vi.fn(() => null),
});
