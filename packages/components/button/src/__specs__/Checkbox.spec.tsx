import React from 'react';

import { renderWithProvider, rulesFor } from '@synerise/ds-core/testing';
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

  describe('indicator', () => {
    const getBox = (checkbox: HTMLElement) =>
      checkbox.querySelector('.ds-checkbox-inner');
    // jsdom drops var() colours next to the `border` shorthand, so read the cascade instead
    const restingBorderColor = (box: Element | null) =>
      rulesFor(box)
        .filter(({ selector }) => !/:(focus|hover)/.test(selector))
        .flatMap(({ declarations }) => declarations.split(';'))
        .filter((declaration) => declaration.startsWith('border-color:'))
        .at(-1);

    it('renders the ds-checkbox box with a tokenised tick when checked', () => {
      renderWithProvider(<Checkbox checked />);

      const box = getBox(screen.getByRole('checkbox'));
      expect(box).toHaveStyle(
        'background-color: var(--ds-form-control-bg-selected)',
      );
      expect(box).toHaveStyle('color: var(--ds-form-control-icon-selected)');
    });

    it('has no hardcoded fill in any state', () => {
      const { container } = renderWithProvider(
        <>
          <Checkbox />
          <Checkbox checked />
          <Checkbox indeterminate />
        </>,
      );

      expect(container.querySelector('[fill]')).toBeNull();
    });

    it('keeps the selected fill and shows the error border when checked with an error', () => {
      renderWithProvider(<Checkbox checked hasError />);

      const box = getBox(screen.getByRole('checkbox'));
      expect(box).toHaveStyle(
        'background-color: var(--ds-form-control-bg-selected)',
      );
      expect(restingBorderColor(box)).toBe(
        'border-color:var(--ds-form-control-border-error)',
      );
    });
  });
});
