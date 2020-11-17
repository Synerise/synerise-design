import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
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

function isTabsContainer(element: { [x: string]: { memoizedProps: { [x: string]: string; }; }; }) {
  return element[Object.keys(element)[0]]?.memoizedProps?.['data-testid'] === 'tabs-container';
}

//mock for width/height for useResize and tabs visibility
const originalOffsetWidth = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'offsetWidth');

beforeAll(()=>{
  Object.defineProperty(window.HTMLElement.prototype, 'offsetWidth',{
    ...originalOffsetWidth,
      get: function() {
        if (isTabsContainer(this)) {
          return 800;
        }

        return originalOffsetWidth!.get!.call(this);
      }
  });
})

afterAll(() => {
  // @ts-ignore
  Object.defineProperty(window.HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
});

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

  it('should render when number of tabs decreases', function() {
    // ARRANGE
    const filteredTabs =[tabs[0], tabs[1]];
    const { getAllByTestId, rerender } = renderWithProvider(<Tabs tabs={tabs} activeTab={0} handleTabClick={() => {}} />);

    // ACT
    rerender(<Tabs tabs={filteredTabs} activeTab={0} handleTabClick={() => {}} />);

    // ASSERT
    expect(getAllByTestId('tab-container').length).toBe(2);
  });
});
