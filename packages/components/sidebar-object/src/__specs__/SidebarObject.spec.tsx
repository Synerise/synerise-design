import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
import { screen } from '@testing-library/react';

import { ButtonVariant } from '../Elements/Header/Header.types';
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
  it('should render headerTabs', function () {
    renderWithProvider(
      <SidebarObject
        name="Name"
        texts={{ name: 'Text' }}
        inputObject={{ Status: 'active', id: '123' }}
        headerTabs={TABS}
      />,
    );
    expect(screen.getByTestId('tabs-container')).toBeInTheDocument();
    expect(screen.getAllByTestId('tab-container')).toHaveLength(TABS.length);
  });
  it('should render headerPreffix', function () {
    renderWithProvider(
      <SidebarObject
        name="Name"
        texts={{ name: 'Text' }}
        inputObject={{ Status: 'active', id: '123' }}
        headerTabs={TABS}
        headerPreffix={<div data-testid="header-prefix" />}
      />,
    );
    expect(screen.getByTestId('header-prefix')).toBeInTheDocument();
  });

  it('should render dropdownMenu', function () {
    renderWithProvider(
      <SidebarObject
        name="Name"
        texts={{ name: 'Text' }}
        inputObject={{ Status: 'active', id: '123' }}
        headerTabs={TABS}
        typeButtons={ButtonVariant.WITH_NAVIGATION}
        onEdit={jest.fn()}
        onDuplicate={jest.fn()}
      />,
    );
    expect(
      screen.getByTestId('sidebar-object-dropdown-menu-trigger'),
    ).toBeInTheDocument();
  });

  it('should not render dropdownMenu', function () {
    renderWithProvider(
      <SidebarObject
        name="Name"
        texts={{ name: 'Text' }}
        inputObject={{ Status: 'active', id: '123' }}
        typeButtons={ButtonVariant.WITH_NAVIGATION}
        headerTabs={TABS}
      />,
    );
    expect(
      screen.queryByTestId('sidebar-object-dropdown-menu-trigger'),
    ).not.toBeInTheDocument();
  });
});
