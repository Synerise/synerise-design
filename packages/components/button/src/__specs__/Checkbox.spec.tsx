import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';

import { Checkbox } from '../index';

describe('<Checkbox />', () => {
  it('should render unchecked if no props provided', () => {
    renderWithProvider(<Checkbox />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should toggle checked state on click', () => {
    renderWithProvider(<Checkbox />);

    const checkboxElem = screen.getByRole('checkbox');
    expect(checkboxElem).not.toBeChecked();

    fireEvent.click(checkboxElem);
    expect(checkboxElem).toBeChecked();

    fireEvent.click(checkboxElem);
    expect(checkboxElem).not.toBeChecked();
  });

  it('should render with indeterminate prop', () => {
    renderWithProvider(<Checkbox indeterminate />);

    const checkboxElem = screen.getByRole('checkbox');

    expect(checkboxElem).not.toBeChecked();
    expect(checkboxElem).toHaveAttribute('aria-checked', 'mixed');
  });

  it('should exec onChange callback with next state value', () => {
    const fakeOnChange = vi.fn();
    renderWithProvider(<Checkbox onChange={fakeOnChange} />);

    const checkboxElem = screen.getByRole('checkbox');

    fireEvent.click(checkboxElem);
    expect(fakeOnChange).toHaveBeenCalledWith(true);

    fireEvent.click(checkboxElem);
    expect(fakeOnChange).toHaveBeenCalledWith(false);
  });
});
