import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';
import { PasswordInput } from './PasswordInput';


const TEST_ID = 'password-input';

describe('PasswordInput', () => {
  const onClick = jest.fn();
  it('should render value', () => {
    renderWithProvider(
      <PasswordInput data-testid={TEST_ID}/>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });

  it('should change type from password to text after onClick on icon', () => {
    renderWithProvider(
      <PasswordInput data-testid={TEST_ID} onClick={onClick}/>,
    );

    const input = screen.getByTestId(TEST_ID);
    expect(input).toHaveAttribute('type', 'password');

    const toggleIcon = screen.getByTestId('ds-icon-show-m');
    fireEvent.click(toggleIcon);

    expect(input).toHaveAttribute('type', 'text');
  });
});
