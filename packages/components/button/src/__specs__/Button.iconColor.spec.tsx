import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { screen } from '@testing-library/react';

import Button from '../index';

const RED = 'var(--ds-color-custom-red-600)';

const renderWithIconColor = (iconColor: string) =>
  renderWithProvider(
    <Button type="ghost" iconColor={iconColor}>
      Label
    </Button>,
  );

describe('Button iconColor', () => {
  it('maps a custom-colour family to its 600 token', () => {
    renderWithIconColor('blue');

    expect(screen.getByRole('button')).toHaveStyle(
      'color: var(--ds-color-custom-blue-600)',
    );
  });

  it('passes a CSS colour through instead of turning it red', () => {
    renderWithIconColor('rgb(255, 255, 255)');

    const button = screen.getByRole('button');
    expect(button).toHaveStyle('color: rgb(255, 255, 255)');
    expect(button).not.toHaveStyle(`color: ${RED}`);
  });

  it('leaves an unknown value on the button colour instead of red', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    renderWithIconColor('not-a-colour');

    expect(screen.getByRole('button')).not.toHaveStyle(`color: ${RED}`);
    warn.mockRestore();
  });
});
