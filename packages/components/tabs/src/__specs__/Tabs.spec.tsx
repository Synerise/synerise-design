import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import Tabs from '../Tabs';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';

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
    // ARRANGE
    const content = <div style={{width: '800px'}}><Tabs tabs={tabs} activeTab={0} handleTabClick={() => {}} /></div>;
    const { getByTestId } = renderWithProvider(content);

    // ASSERT
    expect(getByTestId('tabs-container')).toBeTruthy();
  });

  it('should render dropdown', () => {
    // ARRANGE
    const handleConfigurationAction = jest.fn();
    const content = <div style={{width: '800px'}}><Tabs tabs={[]} activeTab={0} handleTabClick={() => {}} configuration={{label: 'Button label', action: handleConfigurationAction}} /></div>;
    const { baseElement } = renderWithProvider(content, { container: document.body});

    // ASSERT
    expect(baseElement.getElementsByClassName('ant-dropdown')).toBeTruthy();
  });

  it('should render configuration action button ', () => {
    // ARRANGE
    const handleConfigurationAction = jest.fn();
    const LABEL = 'Button label';
    const content = <div style={{width: '800px'}}><Tabs tabs={[]} activeTab={0} handleTabClick={() => {}} configuration={{label: LABEL, action: handleConfigurationAction}} /></div>;
    const { baseElement } = renderWithProvider(content, { container: document.body });

    // ASSERT
    expect(baseElement.getElementsByClassName('ant-dropdown-trigger')).toBeTruthy();
  });
});
