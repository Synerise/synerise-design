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
  it('should render folder name', function() {
    // ARRANGE
    const { getByDisplayValue } = renderWithProvider(
      <SidebarObject
        name='Name'
        parentFolder={{name: 'Folder', id: 'FolderItem'}}
        // @ts-ignore
        texts={{name: 'Text'}}
        inputObject={{}}
        headerTabs={TABS}
      />
    );
    // ASSERT
    expect(getByDisplayValue('Name')).toBeTruthy();
  });
  it('should render inputObject key', function() {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <SidebarObject
        name='Name'
        parentFolder={{name: 'Folder', id: 'FolderItem'}}
        // @ts-ignore
        texts={{name: 'Text'}}
        inputObject={{Status: 'active'}}
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
        inputObject={{Status: 'active'}}
        headerTabs={TABS}
      />
    );
    // ASSERT
    expect(getByText('active')).toBeTruthy();
  });
  it('should render headerTabs', function() {
    // ARRANGE
    const { container } = renderWithProvider(
      <SidebarObject
        name='Name'
        parentFolder={{name: 'Folder' ,id: 'FolderItem'}}
        // @ts-ignore
        texts={{name: 'Text'}}
        inputObject={{Status: 'active'}}
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
        parentFolder={{name: 'Folder' ,id: 'FolderItem'}}
        // @ts-ignore
        texts={{name: 'Text'}}
        inputObject={{Status: 'active'}}
        headerTabs={TABS}
        headerPreffix={<div className='buttons'/>}
      />
    );
    // ASSERT
    expect(container.querySelector('.buttons')).toBeTruthy();


  });
});