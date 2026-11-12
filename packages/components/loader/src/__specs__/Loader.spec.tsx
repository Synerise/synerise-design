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
    const spinner = container.querySelector('.ds-loader-spinner');

    expect(declarationsFor(spinner)).toContain(`border:2px solid var(${token})`);
  });
  it('should expose class names on inner elements', () => {
    const { container } = renderWithProvider(
      <Loader
        label="Loading..."
        text="Header"
        percent={42}
        percentFormatter={(percent) => `${percent}%`}
      />,
    );
    const root = container.querySelector('.ds-loader');

    expect(
      root?.querySelector('.ds-loader-spinner-wrapper .ds-loader-spinner'),
    ).toBeTruthy();
    expect(root?.querySelector('.ds-loader-header')).toHaveTextContent(
      'Header',
    );
    expect(root?.querySelector('.ds-loader-label')).toHaveTextContent(
      'Loading...',
    );
    expect(
      root?.querySelector('.ds-loader-label .ds-loader-percent'),
    ).toHaveTextContent('42%');
  });
  it('should not add an undefined class when className is omitted', () => {
    const { container } = renderWithProvider(<Loader />);

    expect(container.querySelector('.ds-loader')?.className).not.toContain(
      'undefined',
    );
  });
  it('should append a custom className to the root', () => {
    const { container } = renderWithProvider(<Loader className="custom" />);

    expect(container.querySelector('.ds-loader.custom')).toBeTruthy();
  });
});
