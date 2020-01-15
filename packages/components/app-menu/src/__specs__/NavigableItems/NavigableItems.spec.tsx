import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';

import NavigableItems from '../../NavigableItems/NavigableItems';
import { fireEvent, waitForElement } from '@testing-library/react';

describe('NavigableItems', () => {
  const onHideMenu = jest.fn();

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
    Element.prototype.getBoundingClientRect = jest.fn(
      () => ({ 
        width: 120,
        height: 208,
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
    const { getByText, queryByText, getByRole, queryAllByRole } = renderWithProvider(Component);

    expect(queryAllByRole('listitem').length).toEqual(1); // Only one nav button is visible on start
    expect(getByText('Item #1')).toBeTruthy();
    expect(getByText('Item #3')).toBeTruthy();
    expect(queryByText('Item #4')).toBeFalsy();
    expect(queryByText('Item #5')).toBeFalsy();

    // Navigate bottom
    fireEvent.click(getByRole('listitem'));
    await waitForElement(() => getByText('Item #4'));
    expect(getByText('Item #4')).toBeTruthy();
    expect(getByText('Item #5')).toBeTruthy();
    expect(queryByText('Item #1')).toBeFalsy();

    //Navigate top
    fireEvent.click(getByRole('listitem'));
    await waitForElement(() => getByText('Item #1'));
    expect(getByText('Item #1')).toBeTruthy();
    expect(queryByText('Item #5')).toBeFalsy();

    //Call onHideMenu
    fireEvent.click(getByText('Item #1'));
    expect(onHideMenu).toHaveBeenCalled();
  });

  it('should skip nav buttons when container has enough space', () => {
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
    const { getByText, queryAllByRole } = renderWithProvider(Component);

    expect(queryAllByRole('listitem').length).toEqual(0); 
    expect(getByText('Item #1')).toBeTruthy();
    expect(getByText('Item #5')).toBeTruthy();
  });
});
