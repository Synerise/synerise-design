import React from 'react';

import { SearchM } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-core';
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
