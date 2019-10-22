import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import Tabs from './../Tabs';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import { fireEvent } from '@testing-library/dom';

const tabs = [
  {
    icon: <SearchM />
  },
  {
    label: 'Tab #2',
  },
  {
    label: 'Tab #3',
    icon: <SearchM />
  },
];

const WAIT_FOR_HOOKS = 100;

describe('Tabs component', () => {
  it('should render tabs container', () => {
    // ARRANGE
    const content = <div style={{width: '800px'}}><Tabs tabs={tabs} activeTab={0} handleTabClick={() => {}} /></div>;
    const { getByTestId } = renderWithProvider(content);

    // ASSERT
    expect(getByTestId('tabs-container')).toBeTruthy();
  });

  it('should render tabs container with 3 items', () => {
    // ARRANGE
    const content = <div style={{width: '800px'}}><Tabs tabs={tabs} activeTab={0} handleTabClick={() => {}} /></div>;
    const { rerender, queryAllByTestId } = renderWithProvider(content);

    // ACT
    setTimeout(() => {
      rerender(content);

      // ASSERT
      expect(queryAllByTestId('tab-container').length).toBe(3);
    }, WAIT_FOR_HOOKS)
  });

  it('should call handleTabClick', () => {
    // ARRANGE
    const handleTabClick = jest.fn();
    const content = <div style={{width: '800px'}}><Tabs tabs={tabs} activeTab={0} handleTabClick={handleTabClick} /></div>;
    const { rerender, queryAllByTestId } = renderWithProvider(content);

    // ACT
    setTimeout(() => {
      rerender(content);
      const firstTab = queryAllByTestId('tab-container')[0];
      fireEvent.click(firstTab);

      // ASSERT
      expect(handleTabClick).toBeCalled();
    }, WAIT_FOR_HOOKS)
  });

  it('should render dropdown', () => {
    // ARRANGE
    const handleConfigurationAction = jest.fn();
    const content = <div style={{width: '800px'}}><Tabs tabs={[]} activeTab={0} handleTabClick={() => {}} configuration={{label: 'Button label', action: handleConfigurationAction}} /></div>;
    const { rerender, getByTestId } = renderWithProvider(content);

    // ACT
    setTimeout(() => {
      rerender(content);

      // ASSERT
      expect(getByTestId('tabs-dropdown-container')).toBeTruthy();
    }, WAIT_FOR_HOOKS)
  });

  it('should render configuration action button ', () => {
    // ARRANGE
    const handleConfigurationAction = jest.fn();
    const LABEL = 'Button label';
    const content = <div style={{width: '800px'}}><Tabs tabs={[]} activeTab={0} handleTabClick={() => {}} configuration={{label: LABEL, action: handleConfigurationAction}} /></div>;
    const { rerender, getByText } = renderWithProvider(content);

    // ACT
    setTimeout(() => {
      rerender(content);

      // ASSERT
      expect(getByText(LABEL)).toBeTruthy();
    }, WAIT_FOR_HOOKS)
  });

  it('should call configuration action ', () => {
    // ARRANGE
    const handleConfigurationAction = jest.fn();
    const LABEL = 'Button label';
    const content = <div style={{width: '800px'}}><Tabs tabs={[]} activeTab={0} handleTabClick={() => {}} configuration={{label: LABEL, action: handleConfigurationAction}} /></div>;
    const { rerender, getByText } = renderWithProvider(content);

    // ACT
    setTimeout(() => {
      rerender(content);
      const button = getByText(LABEL);
      fireEvent.click(button);

      // ASSERT
      expect(handleConfigurationAction).toBeCalled();
    }, WAIT_FOR_HOOKS)
  });
});