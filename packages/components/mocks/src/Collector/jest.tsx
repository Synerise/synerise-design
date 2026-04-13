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

export const mockCollector = () => {
  jest.mock('@synerise/ds-collector', () => {
    const Values = jest.fn(
      ({ children, 'data-testid': dataTestId }: CollectorValuesProps) => (
        <div data-testid={dataTestId || 'ds-collector-values'}>{children}</div>
      ),
    );

    const ButtonPanel = jest.fn(
      ({ children, 'data-testid': dataTestId }: CollectorButtonPanelProps) => (
        <div data-testid={dataTestId || 'ds-collector-button-panel'}>
          {children}
        </div>
      ),
    );

    const OptionsDropdown = jest.fn(
      ({
        children,
        'data-testid': dataTestId,
      }: CollectorOptionsDropdownProps) => (
        <div data-testid={dataTestId || 'ds-collector-options-dropdown'}>
          {children}
        </div>
      ),
    );

    const NavigationHint = jest.fn(
      ({
        children,
        'data-testid': dataTestId,
      }: CollectorNavigationHintProps) => (
        <div data-testid={dataTestId || 'ds-collector-navigation-hint'}>
          {children}
        </div>
      ),
    );

    const Collector = Object.assign(
      jest.fn(
        ({
          children,
          className,
          'data-testid': dataTestId,
        }: CollectorProps) => (
          <div data-testid={dataTestId || 'ds-collector'} className={className}>
            {children}
          </div>
        ),
      ),
      { Values, ButtonPanel, OptionsDropdown, NavigationHint },
    );

    return {
      __esModule: true,
      default: Collector,
    };
  });
};
