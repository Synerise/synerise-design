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

describe('Tabs component', () => {
  it('should render tabs container', () => {
    const content = <div style={{width: '800px'}}><Tabs tabs={tabs} activeTab={0} handleTabClick={() => {}} /></div>;
    const { getByTestId } = renderWithProvider(content);
      expect(getByTestId('tabs-container')).toBeTruthy();
  });

  it('should render tabs container with 3 items', () => {
    const content = <div style={{width: '800px'}}><Tabs tabs={tabs} activeTab={0} handleTabClick={() => {}} /></div>;
    const { rerender, queryAllByTestId } = renderWithProvider(content);
    setTimeout(() => {
      rerender(content);
      expect(queryAllByTestId('tab-container').length).toBe(3);
    }, 100)
  });

  it('should call handleTabClick', () => {
    const handleTabClick = jest.fn();
    const content = <div style={{width: '800px'}}><Tabs tabs={tabs} activeTab={0} handleTabClick={handleTabClick} /></div>;
    const { rerender, queryAllByTestId } = renderWithProvider(content);
    setTimeout(() => {
      rerender(content);
      const firstTab = queryAllByTestId('tab-container')[0];
      fireEvent.click(firstTab);
      expect(handleTabClick).toBeCalled();
    }, 100)
  });

  it('should render dropdown', () => {
    const handleConfigurationAction = jest.fn();
    const content = <div style={{width: '800px'}}><Tabs tabs={[]} activeTab={0} handleTabClick={() => {}} configuration={{label: 'Button label', action: handleConfigurationAction}} /></div>;
    const { rerender, getByTestId } = renderWithProvider(content);
    setTimeout(() => {
      rerender(content);
      expect(getByTestId('tabs-dropdown-container')).toBeTruthy();
    }, 100)
  });

  it('should render configuration action button ', () => {
    const handleConfigurationAction = jest.fn();
    const LABEL = 'Button label';
    const content = <div style={{width: '800px'}}><Tabs tabs={[]} activeTab={0} handleTabClick={() => {}} configuration={{label: LABEL, action: handleConfigurationAction}} /></div>;
    const { rerender, getByText } = renderWithProvider(content);
    setTimeout(() => {
      rerender(content);
      expect(getByText(LABEL)).toBeTruthy();
    }, 100)
  });

  it('should call configuration action ', () => {
    const handleConfigurationAction = jest.fn();
    const LABEL = 'Button label';
    const content = <div style={{width: '800px'}}><Tabs tabs={[]} activeTab={0} handleTabClick={() => {}} configuration={{label: LABEL, action: handleConfigurationAction}} /></div>;
    const { rerender, getByText } = renderWithProvider(content);
    setTimeout(() => {
      rerender(content);
      const button = getByText(LABEL);
      fireEvent.click(button);
      expect(handleConfigurationAction).toBeCalled();
    }, 100)
  });
});