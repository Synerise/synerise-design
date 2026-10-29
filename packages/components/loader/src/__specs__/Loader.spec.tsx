import React from 'react';

import { declarationsFor, renderWithProvider } from '@synerise/ds-core/testing';

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

  it.each([
    { color: undefined, token: '--ds-color-custom-grey-600' },
    { color: 'blue', token: '--ds-color-custom-blue-600' },
    { color: 'red-500', token: '--ds-color-custom-red-500' },
  ])('resolves color $color to the $token custom-colour token', ({ color, token }) => {
    const { container } = renderWithProvider(<Loader color={color} />);
    const spinner = container.querySelector('.ds-loader > div > div');

    expect(declarationsFor(spinner)).toContain(`border:2px solid var(${token})`);
  });
});
