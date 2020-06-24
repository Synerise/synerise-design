import * as React from 'react';
import { render } from '@testing-library/react';
import DSFlag from '../Flag';


describe('Flag', () => {
  it('should render', () => {
    // ARRANGE
    const { getByAltText } = render(<DSFlag country="PL"/>);

    // ASSERT
    expect(getByAltText('PL Flag')).toBeTruthy();
  });
});
