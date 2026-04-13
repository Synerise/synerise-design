import React from 'react';

type MockCardProps = {
  children?: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  withHeader?: boolean;
  raised?: boolean;
  compact?: boolean;
  lively?: boolean;
  'data-testid'?: string;
};

type MockCardGroupProps = {
  children?: React.ReactNode;
  columns?: number;
  'data-testid'?: string;
};

type MockCardBadgeProps = {
  children?: React.ReactNode;
  status?: string;
  'data-testid'?: string;
};

type MockCardSummaryProps = {
  children?: React.ReactNode;
  'data-testid'?: string;
};

/**
 * Factory function for Card mock.
 * Mocks the entire @synerise/ds-card package including Card, CardGroup, CardBadge, and CardSummary.
 *
 * @example
 * ```typescript
 * import { cardMockFactory } from '@synerise/ds-mocks/Card/vi';
 *
 * vi.mock('@synerise/ds-card', cardMockFactory);
 * ```
 */
export const cardMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      className,
      title,
      description,
      withHeader,
      raised,
      compact,
      lively,
      'data-testid': dataTestId,
    }: MockCardProps) => {
      const testId = dataTestId || 'ds-card';
      return (
        <div
          data-testid={testId}
          className={`ds-card ${className || ''}`}
          data-raised={raised}
          data-compact={compact}
          data-lively={lively}
        >
          {withHeader && (title || description) && (
            <div data-testid={`${testId}-header`}>
              {title && <div data-testid={`${testId}-title`}>{title}</div>}
              {description && (
                <div data-testid={`${testId}-description`}>{description}</div>
              )}
            </div>
          )}
          {children}
        </div>
      );
    },
  ),
  CardGroup: vi.fn(
    ({ children, columns, 'data-testid': dataTestId }: MockCardGroupProps) => (
      <div data-testid={dataTestId || 'ds-card-group'} data-columns={columns}>
        {children}
      </div>
    ),
  ),
  CardBadge: vi.fn(
    ({ children, status, 'data-testid': dataTestId }: MockCardBadgeProps) => (
      <div data-testid={dataTestId || 'ds-card-badge'} data-status={status}>
        {children}
      </div>
    ),
  ),
  CardSummary: vi.fn(
    ({ children, 'data-testid': dataTestId }: MockCardSummaryProps) => (
      <div data-testid={dataTestId || 'ds-card-summary'}>{children}</div>
    ),
  ),
  CardStyles: {},
});

/**
 * Factory function for minimal Card mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-card', cardMinimalMockFactory);
 * ```
 */
export const cardMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  CardGroup: vi.fn(() => null),
  CardBadge: vi.fn(() => null),
  CardSummary: vi.fn(() => null),
  CardStyles: {},
});
