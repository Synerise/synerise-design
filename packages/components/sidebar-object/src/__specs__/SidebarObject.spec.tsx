import * as React from 'react';
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
  it('should render inputObject key', function() {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <SidebarObject
        name='Name'
        parentFolder={{name: 'Folder', id: 'FolderItem'}}
        // @ts-ignore
        texts={{name: 'Text'}}
        inputObject={{Status: 'active', id: "123"}}
        headerTabs={TABS}
      />
    );
    // ASSERT
    expect(getByText('Status')).toBeTruthy();
  });
  it('should render inputObject value', function() {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <SidebarObject
        name='Name'
        parentFolder={{name: 'Folder' ,id: 'FolderItem'}}
        // @ts-ignore
        texts={{name: 'Text'}}
        inputObject={{Status: 'active', id: "123"}}
        headerTabs={TABS}
      />
    );
    // ASSERT
    expect(getByText('active')).toBeTruthy();
  });

});