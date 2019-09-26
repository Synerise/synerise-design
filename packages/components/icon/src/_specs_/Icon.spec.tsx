import * as React from 'react';
import { render } from '@testing-library/react';
import Icon from '../index';

describe('Icon', () => {
  it('should render', () => {
    // ARRANGE
    const TEST_TEXT = 'test text';
    const { getByTitle } = render(<Icon title={TEST_TEXT} name={TEST_TEXT} />);

    // ASSERT
    expect(getByTitle(TEST_TEXT)).toBeTruthy();
  });
});
