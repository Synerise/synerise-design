import * as React from 'react';
import { render } from '@testing-library/react';
import Icon from '../index';

describe('Icon', () => {
  it('should render', () => {
    // ARRANGE
    const TEST_TEXT = 'test text';
    const { getByText } = render(<Icon name={TEST_TEXT} />);

    // ASSERT
    expect(getByText(TEST_TEXT)).toBeTruthy();
  });
});
