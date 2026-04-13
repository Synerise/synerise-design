import React from 'react';

type MockCardTabsProps = {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

type MockCardTabProps = {
  children?: React.ReactNode;
  name?: string;
  active?: boolean;
  'data-testid'?: string;
};

export const mockCardTabs = () => {
  jest.mock('@synerise/ds-card-tabs', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        'data-testid': dataTestId,
      }: MockCardTabsProps) => (
        <div data-testid={dataTestId || 'ds-card-tabs'} className={className}>
          {children}
        </div>
      ),
    ),
    CardTab: jest.fn(
      ({
        children,
        name,
        active,
        'data-testid': dataTestId,
      }: MockCardTabProps) => (
        <div
          data-testid={dataTestId || 'ds-card-tab'}
          data-active={active}
          data-name={name}
        >
          {children}
        </div>
      ),
    ),
    prefixType: {},
    CardDot: jest.fn(() => null),
    CardTabsStyles: {},
  }));
};

export const mockCardTabsMinimal = () => {
  jest.mock('@synerise/ds-card-tabs', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    CardTab: jest.fn(() => null),
    prefixType: {},
    CardDot: jest.fn(() => null),
    CardTabsStyles: {},
  }));
};
