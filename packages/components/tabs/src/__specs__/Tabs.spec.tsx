import React from 'react';

import Icon, { SearchM } from '@synerise/ds-icon';
import { renderWithProvider, rulesFor } from '@synerise/ds-core/testing';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tabs from '../Tabs';

const tabs = [
  {
    icon: <SearchM />,
  },
  {
    label: 'Tab #2',
  },
  {
    label: 'Tab #3',
    icon: <SearchM />,
  },
];

const resizeObserverMock = window.ResizeObserver;

beforeAll(() => {
  window.ResizeObserver = class MockedResizeObserver {
    constructor(cb) {
      setTimeout(() => {
        cb(
          [
            {
              contentRect: {
                x: 0,
                y: 0,
                width: 800,
                height: 600,
              },
            },
          ],
          this,
        );
      }, 100);
    }
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  };
});

afterAll(() => {
  window.ResizeObserver = resizeObserverMock;
});

describe('Tabs component', () => {
  it('should render tabs container', async () => {
    const content = (
      <Tabs tabs={tabs} activeTab={0} handleTabClick={() => {}} />
    );
    renderWithProvider(content);
    const tabsContainer = screen.getByTestId('tabs-container');

    const tabsRendered =
      await within(tabsContainer).findAllByTestId('tab-container');
    expect(tabsRendered.length).toBe(tabs.length);
  });

  it('should render dropdown', () => {
    const handleConfigurationAction = vi.fn();
    const content = (
      <Tabs
        tabs={[]}
        activeTab={0}
        handleTabClick={() => {}}
        configuration={{
          label: 'Button label',
          action: handleConfigurationAction,
        }}
      />
    );
    renderWithProvider(content);

    expect(screen.getByTestId('tabs-dropdown-trigger')).toBeInTheDocument();
  });

  it('should render configuration action button ', async () => {
    const handleConfigurationAction = vi.fn();
    const LABEL = 'Button label';
    const content = (
      <Tabs
        tabs={[]}
        activeTab={0}
        handleTabClick={() => {}}
        configuration={{ label: LABEL, action: handleConfigurationAction }}
      />
    );
    renderWithProvider(content);

    await userEvent.click(screen.getByTestId('tabs-dropdown-trigger'));

    const configurationButton = await screen.findByText(LABEL);
    await userEvent.click(configurationButton);

    expect(handleConfigurationAction).toHaveBeenCalledTimes(1);
  });

  it('should render when number of tabs decreases', async function () {
    const filteredTabs = [tabs[0], tabs[1]];
    const { rerender } = renderWithProvider(
      <Tabs tabs={tabs} activeTab={0} handleTabClick={() => {}} />,
    );
    const tabsContainer = screen.getByTestId('tabs-container');

    const tabsInitially =
      await within(tabsContainer).findAllByTestId('tab-container');
    expect(tabsInitially.length).toBe(3);

    rerender(
      <Tabs tabs={filteredTabs} activeTab={0} handleTabClick={() => {}} />,
    );

    const tabsFinal =
      await within(tabsContainer).findAllByTestId('tab-container');
    expect(tabsFinal.length).toBe(2);
  });
});

// Rules setting a colour on the svg inside `element` that come through `owner`.
const svgColourRules = (element: Element | null, owner: Element) =>
  rulesFor(element?.querySelector('svg') ?? null, {
    within: owner,
    state: 'any',
  }).filter(({ declarations }) => /(^|;)(fill|color):/.test(declarations));

describe('Tab icon colours', () => {
  const SUFFIX_COLOR = 'var(--ds-color-icon-success-default)';

  const renderTab = () => {
    renderWithProvider(
      <Tabs
        tabs={[
          {
            label: 'Tab',
            icon: <SearchM />,
            suffixel: (
              <Icon
                component={<svg />}
                color={SUFFIX_COLOR}
                data-testid="suffix-icon"
              />
            ),
          },
        ]}
        activeTab={0}
        handleTabClick={() => {}}
      />,
    );
    const icon = screen.getAllByTestId('ds-tabs-tab-icon')[0];
    const tab = icon.closest('button') as HTMLElement;
    return { icon, tab };
  };

  it('drives the tab icon state colours through the icon container', () => {
    const { icon, tab } = renderTab();
    const byState = rulesFor(icon, { within: tab, state: 'any' }).reduce<
      Record<string, string>
    >((states, { selector, declarations }) => {
      const state = selector.split(' ')[0].replace(/^\.[\w-]+/, '');
      return { ...states, [state]: `${states[state] ?? ''}${declarations}` };
    }, {});

    expect(icon?.querySelector('svg')).toHaveStyle('color: inherit');
    expect(byState['']).toContain('color:var(--ds-color-icon-base-default)');
    expect(byState[':hover']).toContain(
      'color:var(--ds-tabs-item-text-hover)',
    );
    expect(byState[':focus']).toContain(
      'color:var(--ds-color-focus-base-default)',
    );
    expect(byState[':focus:active']).toContain(
      'color:var(--ds-tabs-item-text-active)',
    );
    expect(byState['.active']).toContain(
      'color:var(--ds-tabs-item-text-active)',
    );
    expect(byState['.pressed']).toContain(
      'color:var(--ds-color-text-brand-defaulthover)',
    );
  });

  it('lets an explicit suffixel icon colour win in every tab state', () => {
    const { tab } = renderTab();

    const suffixIcon = screen.getAllByTestId('suffix-icon')[0];
    expect(suffixIcon?.querySelector('svg')).toHaveStyle(
      `color: ${SUFFIX_COLOR}`,
    );
    expect(svgColourRules(suffixIcon, tab)).toEqual([]);
  });
});
