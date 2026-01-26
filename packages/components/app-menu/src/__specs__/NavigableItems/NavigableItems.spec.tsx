import React from 'react';
import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';

import NavigableItems from '../../NavigableItems/NavigableItems';


describe('NavigableItems', () => {
  const onHideMenu = vi.fn();

  const Component = (
    <NavigableItems onHideMenu={onHideMenu}>
      <span>Item #1</span>
      <span>Item #2</span>
      <span>Item #3</span>
      <span>Item #4</span>
      <span>Item #5</span>
    </NavigableItems>
  );

  it('should render navigable items and allow to navigate through them', async () => {
    Element.prototype.getBoundingClientRect = vi.fn(
      () => ({
        width: 120,
        height: 256,
        top: 0,
        left: 0,
        x: 0,
        y: 0,
        bottom: 0,
        right: 0,
        toJSON: vi.fn(),
      })
    );

    renderWithProvider(Component);

    expect(screen.queryAllByRole('listitem').length).toEqual(1); // Only one nav button is visible on start
    expect(screen.getByText('Item #1')).toBeTruthy();
    expect(screen.getByText('Item #3')).toBeTruthy();
    expect(screen.queryByText('Item #4')).toBeFalsy();
    expect(screen.queryByText('Item #5')).toBeFalsy();

    // Navigate bottom
    fireEvent.click(screen.getByRole('listitem'));
    await screen.findByText('Item #4');
    expect(screen.getByText('Item #4')).toBeTruthy();
    expect(screen.getByText('Item #5')).toBeTruthy();
    expect(screen.queryByText('Item #1')).toBeFalsy();

    //Navigate top
    fireEvent.click(screen.getByRole('listitem'));
    await screen.findByText('Item #1');
    expect(screen.getByText('Item #1')).toBeTruthy();
    expect(screen.queryByText('Item #5')).toBeFalsy();

    //Call onHideMenu
    fireEvent.click(screen.getByText('Item #1'));
    expect(onHideMenu).toHaveBeenCalled();
  });

  it('should skip nav buttons when container has enough space', () => {
    Element.prototype.getBoundingClientRect = vi.fn(
      () => ({
        width: 120,
        height: 1000,
        top: 0,
        left: 0,
        x: 0,
        y: 0,
        bottom: 0,
        right: 0,
        toJSON: vi.fn(),
      })
    );

    renderWithProvider(Component);

    expect(screen.queryAllByRole('listitem').length).toEqual(0);
    expect(screen.getByText('Item #1')).toBeTruthy();
    expect(screen.getByText('Item #5')).toBeTruthy();
  });
});
