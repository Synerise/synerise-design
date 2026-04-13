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

export const mockInformationCard = () => {
  jest.mock('@synerise/ds-information-card', () => ({
    __esModule: true,
    default: jest.fn(
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
            {subtitle && (
              <div data-testid={`${testId}-subtitle`}>{subtitle}</div>
            )}
            {children}
          </div>
        );
      },
    ),
    InformationCardPropertyList: jest.fn(
      ({
        children,
        'data-testid': dataTestId,
      }: MockInformationCardPropertyListProps) => (
        <div data-testid={dataTestId || 'ds-information-card-property-list'}>
          {children}
        </div>
      ),
    ),
    InformationCardTooltip: jest.fn(
      ({
        children,
        'data-testid': dataTestId,
      }: MockInformationCardTooltipProps) => (
        <div data-testid={dataTestId || 'ds-information-card-tooltip'}>
          {children}
        </div>
      ),
    ),
    buildExtraInfo: jest.fn(),
    buildIconBadge: jest.fn(),
    buildInitialsBadge: jest.fn(),
  }));
};

export const mockInformationCardMinimal = () => {
  jest.mock('@synerise/ds-information-card', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    InformationCardPropertyList: jest.fn(() => null),
    InformationCardTooltip: jest.fn(() => null),
    buildExtraInfo: jest.fn(),
    buildIconBadge: jest.fn(),
    buildInitialsBadge: jest.fn(),
  }));
};
