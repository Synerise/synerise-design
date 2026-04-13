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

/**
 * Factory function for CardTabs mock.
 * Mocks the entire @synerise/ds-card-tabs package including CardTabs, CardTab, prefixType, CardDot, and CardTabsStyles.
 *
 * @example
 * ```typescript
 * import { cardTabsMockFactory } from '@synerise/ds-mocks/CardTabs/vi';
 *
 * vi.mock('@synerise/ds-card-tabs', cardTabsMockFactory);
 * ```
 */
export const cardTabsMockFactory = () => ({
  default: vi.fn(
    ({ children, className, 'data-testid': dataTestId }: MockCardTabsProps) => (
      <div data-testid={dataTestId || 'ds-card-tabs'} className={className}>
        {children}
      </div>
    ),
  ),
  CardTab: vi.fn(
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
  CardDot: vi.fn(() => null),
  CardTabsStyles: {},
});

/**
 * Factory function for minimal CardTabs mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-card-tabs', cardTabsMinimalMockFactory);
 * ```
 */
export const cardTabsMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  CardTab: vi.fn(() => null),
  prefixType: {},
  CardDot: vi.fn(() => null),
  CardTabsStyles: {},
});
