import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';

import AppMenu from '../index';
import { fireEvent } from '@testing-library/react';

describe('AppMenu', () => {
  it('should render app menu', () => {
    const SETTINGS = 'settings';
    const ASSETS = 'assets';
    const CAMPAIGNS = 'campaigns';
    const CAMPAIGNS_SUBMENU = 'campaigns menu';
    const CAMPAIGNS_SUBMENU_SUBTITLE = 'campaigns menu subtitle';
    const CAMPAIGNS_ITEM_1 = 'email';
    const CAMPAIGNS_ITEM_2 = 'facebook';

    Element.prototype.getBoundingClientRect = jest.fn(
      () => ({
        width: 120,
        height: 1000,
        top: 0,
        left: 0,
        x: 0,
        y: 0,
        bottom: 0,
        right: 0,
        toJSON: jest.fn(),
      })
    );

    // ARRANGE
    const { getByText, getByTestId, container } = renderWithProvider(
      <>
        <AppMenu
          activeItem={CAMPAIGNS}
          footer={<AppMenu.Item name={SETTINGS} id={SETTINGS}>{SETTINGS}</AppMenu.Item>}
        >
          <AppMenu.Item name={ASSETS} id={ASSETS}>{ASSETS}</AppMenu.Item>
          <AppMenu.Item
            name={CAMPAIGNS}
            id={CAMPAIGNS}
            subMenu={(
              <AppMenu.SubMenu>
                <AppMenu.SubMenu.Title>{CAMPAIGNS_SUBMENU}</AppMenu.SubMenu.Title>
                <AppMenu.SubMenu.SubTitle>{CAMPAIGNS_SUBMENU_SUBTITLE}</AppMenu.SubMenu.SubTitle>
                <AppMenu.SubMenu.Item active>{CAMPAIGNS_ITEM_1}</AppMenu.SubMenu.Item>
                <AppMenu.SubMenu.Item>{CAMPAIGNS_ITEM_2}</AppMenu.SubMenu.Item>
              </AppMenu.SubMenu>
            )}
          >
            {CAMPAIGNS}
          </AppMenu.Item>
        </AppMenu>
        <div data-testid="outside"/>
      </>
    );

    // Check wheter menu is closed by default
    expect(container.className.includes('menu--opened')).toBeFalsy();

    // Check if correct subMenu is active
    expect(getByText(CAMPAIGNS).className.includes('active')).toBeTruthy();

    // Open subMenu
    fireEvent.click(getByText(CAMPAIGNS));
    expect(container.querySelector('.menu--opened')).toBeTruthy();

    // Click on item in subMenu
    expect(getByText(CAMPAIGNS_SUBMENU)).toBeTruthy();
    expect(getByText(CAMPAIGNS_SUBMENU_SUBTITLE)).toBeTruthy();
    fireEvent.click(getByText(CAMPAIGNS_ITEM_1));

    // Hide menu after click
    expect(container.querySelector('.menu--opened')).toBeFalsy();

    // Change active item
    fireEvent.click(getByText(ASSETS));
    expect(getByText(CAMPAIGNS).className.includes('active')).toBeFalsy();
    expect(getByText(ASSETS).className.includes('active')).toBeTruthy();

    // Open submenu and click outside menu
    expect(container.querySelector('.menu--opened')).toBeFalsy();
    fireEvent.click(getByText(CAMPAIGNS));
    expect(container.querySelector('.menu--opened')).toBeTruthy();
    fireEvent.mouseDown(getByTestId('outside'));
    expect(container.querySelector('.menu--opened')).toBeFalsy();
  });
});
