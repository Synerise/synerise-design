import React from 'react';

import type { TabItem, TabsProps } from '@synerise/ds-tabs';

export type { TabItem };

export type MockTabsProps = TabsProps & {
  'data-testid'?: string;
};

export const mockTabs = () => {
  jest.mock('@synerise/ds-tabs', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        activeTab = 0,
        tabs = [],
        handleTabClick,
        underscore,
        block,
        'data-testid': dataTestId,
      }: MockTabsProps) => {
        const testId = dataTestId || 'ds-tabs';

        return (
          <div
            data-testid={testId}
            className="ds-tabs"
            data-underscore={underscore}
            data-block={block}
          >
            {tabs.map((tab: TabItem, index: number) => (
              <button
                key={index}
                data-testid={`${testId}-tab-${index}`}
                data-active={activeTab === index}
                disabled={tab.disabled}
                onClick={() => handleTabClick?.(index)}
                className={activeTab === index ? 'active' : ''}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        );
      },
    ),
  }));
};

export const mockTabsMinimal = () => {
  jest.mock('@synerise/ds-tabs', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
