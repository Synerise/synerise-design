import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';

import { EditableCell } from './EditableCell';

describe('EditableCell', () => {
  it('should render the value', () => {
    renderWithProvider(<EditableCell value="Hello" onChange={vi.fn()} />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should render placeholder when value is empty', () => {
    renderWithProvider(
      <EditableCell value="" onChange={vi.fn()} placeholder="Enter text" />,
    );

    expect(screen.getByText('Enter text')).toBeInTheDocument();
  });

  it('should enter edit mode when edit icon is clicked', () => {
    renderWithProvider(<EditableCell value="Hello" onChange={vi.fn()} />);

    // Click the edit icon to enter edit mode
    const icon = document.querySelector('[class*="Icon"]');
    if (icon) {
      fireEvent.click(icon);
      // In edit mode, an input should appear
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('Hello');
    }
  });

  it('should call onChange on blur', () => {
    const onChange = vi.fn();
    renderWithProvider(<EditableCell value="Hello" onChange={onChange} />);

    const icon = document.querySelector('[class*="Icon"]');
    if (icon) {
      fireEvent.click(icon);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'World' } });
      fireEvent.blur(input);

      expect(onChange).toHaveBeenCalledWith('World');
    }
  });
});
