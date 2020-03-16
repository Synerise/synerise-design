import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';

import Divider from '../Divider';

describe('Divider', () => {
  it('should render', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const { getByTestId } = renderWithProvider(<Divider data-testid={TEST_ID} />);

    // ASSERT
    expect(getByTestId(TEST_ID)).toBeTruthy();
  });

  it('should render children', () => {
    // ARRANGE
    const TEST_TEXT = 'test text';
    const { getByText } = renderWithProvider(<Divider>{TEST_TEXT}</Divider>);

    // ASSERT
    expect(getByText(TEST_TEXT)).toBeTruthy();
  });

  it('should use margin props', () => {
    // ARRANGE
    const { container } = renderWithProvider(<Divider marginBottom={5} marginTop={10} />);

    // ASSERT
    expect(container.getElementsByClassName('ant-divider-horizontal')[0]).toHaveStyle('margin-bottom: 5px');
    expect(container.getElementsByClassName('ant-divider-horizontal')[0]).toHaveStyle('margin-top: 10px');
  });
});
