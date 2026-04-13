import React from 'react';

type MockCardSelectProps = {
  children?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  value?: unknown;
  onChange?: (value: unknown) => void;
  checked?: boolean;
  disabled?: boolean;
  raised?: boolean;
  className?: string;
  'data-testid'?: string;
};

type MockCardSelectGroupProps = {
  children?: React.ReactNode;
  columns?: number;
  className?: string;
  'data-testid'?: string;
};

/**
 * Factory function for CardSelect mock.
 * Mocks the entire @synerise/ds-card-select package including CardSelect and CardSelectGroup.
 *
 * @example
 * ```typescript
 * import { cardSelectMockFactory } from '@synerise/ds-mocks/CardSelect/vi';
 *
 * vi.mock('@synerise/ds-card-select', cardSelectMockFactory);
 * ```
 */
export const cardSelectMockFactory = () => {
  const CardSelect = vi.fn(
    ({
      children,
      title,
      description,
      icon,
      value,
      onChange,
      checked,
      disabled,
      raised,
      className,
      'data-testid': dataTestId,
    }: MockCardSelectProps) => {
      const testId = dataTestId || 'ds-card-select';
      return (
        <div
          data-testid={testId}
          className={className}
          data-checked={checked}
          data-disabled={disabled}
          data-raised={raised}
          onClick={() => !disabled && onChange?.(value)}
        >
          {icon && <div data-testid={`${testId}-icon`}>{icon}</div>}
          {title && <div data-testid={`${testId}-title`}>{title}</div>}
          {description && (
            <div data-testid={`${testId}-description`}>{description}</div>
          )}
          {children}
        </div>
      );
    },
  );

  const CardSelectGroup = vi.fn(
    ({
      children,
      columns,
      className,
      'data-testid': dataTestId,
    }: MockCardSelectGroupProps) => {
      const testId = dataTestId || 'ds-card-select-group';
      return (
        <div data-testid={testId} className={className} data-columns={columns}>
          {children}
        </div>
      );
    },
  );

  return {
    default: CardSelect,
    CardSelectGroup,
  };
};

/**
 * Factory function for minimal CardSelect mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-card-select', cardSelectMinimalMockFactory);
 * ```
 */
export const cardSelectMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  CardSelectGroup: vi.fn(() => null),
});
