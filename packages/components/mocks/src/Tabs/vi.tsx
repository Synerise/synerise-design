import React from 'react';

import type { TabItem, TabsProps } from '@synerise/ds-tabs';

export type { TabItem };

export type MockTabsProps = TabsProps & {
  'data-testid'?: string;
};

/**
 * Factory function for Tabs mock.
 * Use directly with vi.mock() to avoid hoisting issues.
 *
 * @example
 * ```typescript
 * import { tabsMockFactory } from '@synerise/ds-mocks/Tabs/vi';
 *
 * vi.mock('@synerise/ds-tabs', tabsMockFactory);
 * ```
 */
export const tabsMockFactory = () => ({
  default: vi.fn(
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
});

/**
 * Factory function for minimal Tabs mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-tabs', tabsMinimalMockFactory);
 * ```
 */
export const tabsMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
