import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from '@testing-library/dom';
import Menu from '../Menu';

describe('Menu', () => {
  const data = [[{ text: 'Option 1' }, { text: 'Option 2' }, { text: 'Option 3', subMenu: [{ text: 'Child 1' }] }]];

  it('should render basic menu list', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Menu dataSource={data} />);

    // ASSERT
    expect(getByText('Option 1')).toBeTruthy();
    expect(getByText('Option 2')).toBeTruthy();
  });

  it('should render nested menu list', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Menu dataSource={data} />);

    const nestedItem = getByText('Option 3') as HTMLElement;
    fireEvent.click(nestedItem);

    // ASSERT
    expect(getByText('Child 1')).toBeTruthy();
  });
});
