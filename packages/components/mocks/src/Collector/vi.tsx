import React, { type ReactNode } from 'react';

type CollectorProps = {
  children?: ReactNode;
  className?: string;
  'data-testid'?: string;
};

type CollectorValuesProps = {
  children?: ReactNode;
  'data-testid'?: string;
};

type CollectorButtonPanelProps = {
  children?: ReactNode;
  'data-testid'?: string;
};

type CollectorOptionsDropdownProps = {
  children?: ReactNode;
  'data-testid'?: string;
};

type CollectorNavigationHintProps = {
  children?: ReactNode;
  'data-testid'?: string;
};

/**
 * Factory function for Collector mock.
 * Mocks the entire @synerise/ds-collector package including Collector and its compound sub-components.
 *
 * @example
 * ```typescript
 * import { collectorMockFactory } from '@synerise/ds-mocks/Collector/vi';
 *
 * vi.mock('@synerise/ds-collector', collectorMockFactory);
 * ```
 */
export const collectorMockFactory = () => {
  const Values = vi.fn(
    ({ children, 'data-testid': dataTestId }: CollectorValuesProps) => (
      <div data-testid={dataTestId || 'ds-collector-values'}>{children}</div>
    ),
  );

  const ButtonPanel = vi.fn(
    ({ children, 'data-testid': dataTestId }: CollectorButtonPanelProps) => (
      <div data-testid={dataTestId || 'ds-collector-button-panel'}>
        {children}
      </div>
    ),
  );

  const OptionsDropdown = vi.fn(
    ({
      children,
      'data-testid': dataTestId,
    }: CollectorOptionsDropdownProps) => (
      <div data-testid={dataTestId || 'ds-collector-options-dropdown'}>
        {children}
      </div>
    ),
  );

  const NavigationHint = vi.fn(
    ({ children, 'data-testid': dataTestId }: CollectorNavigationHintProps) => (
      <div data-testid={dataTestId || 'ds-collector-navigation-hint'}>
        {children}
      </div>
    ),
  );

  const Collector = Object.assign(
    vi.fn(
      ({ children, className, 'data-testid': dataTestId }: CollectorProps) => (
        <div data-testid={dataTestId || 'ds-collector'} className={className}>
          {children}
        </div>
      ),
    ),
    { Values, ButtonPanel, OptionsDropdown, NavigationHint },
  );

  return {
    default: Collector,
  };
};
