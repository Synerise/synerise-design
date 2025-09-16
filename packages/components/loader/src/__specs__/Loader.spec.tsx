import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';

import Loader from '../index';

describe('Loader', () => {
  it('should render', function () {
    // ARRANGE
    const { container } = renderWithProvider(
      <Loader size="L" labelPosition="right" label="Loading..." />,
    );
    // ASSERT
    expect(container.querySelector('.ds-loader')).toBeTruthy();
  });
  it('should render label', function () {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Loader size="L" labelPosition="right" label="Loading..." />,
    );
    // ASSERT
    expect(getByText('Loading...')).toBeTruthy();
  });
});
