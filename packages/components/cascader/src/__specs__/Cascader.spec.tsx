import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Cascader from '../Cascader';

describe('Cascader', () => {

  it('should render', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Cascader categories={{ path: ['Home','Path','Nested'], id: 0, name: 'Path' }} />);

    // ASSERT
    expect(getByText('Nasted')).toBeTruthy();
  });
});
