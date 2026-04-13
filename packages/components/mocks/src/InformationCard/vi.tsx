import React from 'react';

type MockInformationCardProps = {
  children?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  'data-testid'?: string;
};

type MockInformationCardPropertyListProps = {
  children?: React.ReactNode;
  'data-testid'?: string;
};

type MockInformationCardTooltipProps = {
  children?: React.ReactNode;
  'data-testid'?: string;
};

/**
 * Factory function for InformationCard mock.
 * Mocks the entire @synerise/ds-information-card package including InformationCard,
 * InformationCardPropertyList, InformationCardTooltip, and utility functions.
 *
 * @example
 * ```typescript
 * import { informationCardMockFactory } from '@synerise/ds-mocks/InformationCard/vi';
 *
 * vi.mock('@synerise/ds-information-card', informationCardMockFactory);
 * ```
 */
export const informationCardMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      title,
      subtitle,
      'data-testid': dataTestId,
    }: MockInformationCardProps) => {
      const testId = dataTestId || 'ds-information-card';
      return (
        <div data-testid={testId}>
          {title && <div data-testid={`${testId}-title`}>{title}</div>}
          {subtitle && <div data-testid={`${testId}-subtitle`}>{subtitle}</div>}
          {children}
        </div>
      );
    },
  ),
  InformationCardPropertyList: vi.fn(
    ({
      children,
      'data-testid': dataTestId,
    }: MockInformationCardPropertyListProps) => (
      <div data-testid={dataTestId || 'ds-information-card-property-list'}>
        {children}
      </div>
    ),
  ),
  InformationCardTooltip: vi.fn(
    ({
      children,
      'data-testid': dataTestId,
    }: MockInformationCardTooltipProps) => (
      <div data-testid={dataTestId || 'ds-information-card-tooltip'}>
        {children}
      </div>
    ),
  ),
  buildExtraInfo: vi.fn(),
  buildIconBadge: vi.fn(),
  buildInitialsBadge: vi.fn(),
});

/**
 * Factory function for minimal InformationCard mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-information-card', informationCardMinimalMockFactory);
 * ```
 */
export const informationCardMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  InformationCardPropertyList: vi.fn(() => null),
  InformationCardTooltip: vi.fn(() => null),
  buildExtraInfo: vi.fn(),
  buildIconBadge: vi.fn(),
  buildInitialsBadge: vi.fn(),
});
