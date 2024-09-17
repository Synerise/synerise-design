import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import SidebarObject from '../index';



const TABS = [
  {
    label: 'Overview',
  },
  {
    label: 'Changelog',
  },
  {
    label: 'Versions',
  },
];
describe('SidebarObject', () => {

  it('should render headerTabs', function() {
    // ARRANGE
    const { container } = renderWithProvider(
      <SidebarObject
        name='Name'
        texts={{name: 'Text'}}
        inputObject={{Status: 'active', id: "123"}}
        headerTabs={TABS}
      />
    );
    // ASSERT
    expect(container.querySelector('.ds-tabs')).toBeTruthy();


  });
  it('should render headerPreffix', function() {
    // ARRANGE

    const { container } = renderWithProvider(
      <SidebarObject
        name='Name'
        texts={{name: 'Text'}}
        inputObject={{Status: 'active', id: "123"}}
        headerTabs={TABS}
        headerPreffix={<div className='buttons'/>}
      />
    );
    // ASSERT
    expect(container.querySelector('.buttons')).toBeTruthy();
  });

});