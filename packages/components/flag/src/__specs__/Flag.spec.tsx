import * as React from 'react';
import { render } from '@testing-library/react';
import DSFlag from '../Flag';

describe('Flag', () => {
  it('should render', () => {
    // ARRANGE
    const { container } = render(<DSFlag country={'PL'}/>);

    // ASSERT
    expect(container.getElementsByClassName('ds-flag-PL')).toBeTruthy();
  });
});
