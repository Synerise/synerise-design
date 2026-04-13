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

export const mockCard = () => {
  jest.mock('@synerise/ds-card', () => ({
    __esModule: true,
    default: jest.fn(
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
    CardGroup: jest.fn(
      ({
        children,
        columns,
        'data-testid': dataTestId,
      }: MockCardGroupProps) => (
        <div data-testid={dataTestId || 'ds-card-group'} data-columns={columns}>
          {children}
        </div>
      ),
    ),
    CardBadge: jest.fn(
      ({ children, status, 'data-testid': dataTestId }: MockCardBadgeProps) => (
        <div data-testid={dataTestId || 'ds-card-badge'} data-status={status}>
          {children}
        </div>
      ),
    ),
    CardSummary: jest.fn(
      ({ children, 'data-testid': dataTestId }: MockCardSummaryProps) => (
        <div data-testid={dataTestId || 'ds-card-summary'}>{children}</div>
      ),
    ),
    CardStyles: {},
  }));
};

export const mockCardMinimal = () => {
  jest.mock('@synerise/ds-card', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    CardGroup: jest.fn(() => null),
    CardBadge: jest.fn(() => null),
    CardSummary: jest.fn(() => null),
    CardStyles: {},
  }));
};
