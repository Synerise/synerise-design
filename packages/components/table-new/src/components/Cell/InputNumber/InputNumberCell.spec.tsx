import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import { InputNumberCell } from './InputNumberCell';

describe('InputNumberCell', () => {
  it('should render input', () => {
    renderWithProvider(<InputNumberCell />);

    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
  });

  it('should render with initial value', () => {
    renderWithProvider(
      <InputNumberCell inputNumberProps={{ value: 42 }} />,
    );

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue('42');
  });

  it('should render as disabled', () => {
    renderWithProvider(<InputNumberCell disabled />);

    const input = screen.getByRole('spinbutton');
    expect(input).toBeDisabled();
  });
});
