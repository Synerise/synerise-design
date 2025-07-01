import React from 'react';

import { SearchM } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-utils';
import { screen, within } from '@testing-library/react';

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
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
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
    const handleConfigurationAction = jest.fn();
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
    const { baseElement } = renderWithProvider(content);

    expect(baseElement.getElementsByClassName('ant-dropdown')).toBeTruthy();
  });

  it('should render configuration action button ', () => {
    const handleConfigurationAction = jest.fn();
    const LABEL = 'Button label';
    const content = (
      <Tabs
        tabs={[]}
        activeTab={0}
        handleTabClick={() => {}}
        configuration={{ label: LABEL, action: handleConfigurationAction }}
      />
    );
    const { baseElement } = renderWithProvider(content);
    expect(
      baseElement.getElementsByClassName('ant-dropdown-trigger'),
    ).toBeTruthy();
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
