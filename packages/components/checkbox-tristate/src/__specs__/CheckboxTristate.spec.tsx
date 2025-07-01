import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent } from '@testing-library/react';

import { type CheckboxTristateChangeEvent } from '../CheckboxTristate.types';
import CheckboxTristate, { checkedValue, nextCheckedValues } from '../index';

const SELECTOR_FALSE =
  '.ant-checkbox:not(.ant-checkbox-indeterminate):not(.ant-checkbox-indeterminate)';
const SELECTOR_TRUE = '.ant-checkbox-checked:not(.ant-checkbox-indeterminate)';
const SELECTOR_INDETERMINATE = '.ant-checkbox.ant-checkbox-indeterminate';

let mockChecked: boolean | undefined = undefined;
const mockOnChange = jest.fn((event: CheckboxTristateChangeEvent) => {
  mockChecked = event.target.checked;
});

describe('CheckboxTristate', () => {
  it('should render without props', () => {
    const checkbox = renderWithProvider(<CheckboxTristate />);
    expect(checkbox).toBeTruthy();
  });

  it('onChange should return next value', () => {
    const { queryByLabelText } = renderWithProvider(
      <CheckboxTristate checked={mockChecked} onChange={mockOnChange}>
        Label
      </CheckboxTristate>,
    );
    const input = queryByLabelText('Label') as HTMLInputElement;

    fireEvent.click(input);
    expect(mockChecked).toBe(false);
  });

  describe('Helper functions', () => {
    it('checkedValues() should return proper values', () => {
      expect(checkedValue(false, false)).toBe(false);
      expect(checkedValue(false, true)).toBe(undefined);
      expect(checkedValue(true, true)).toBe(undefined);
      expect(checkedValue(true, false)).toBe(true);
    });

    it('nextCheckedValues() should return proper values', () => {
      expect(nextCheckedValues(false, false)).toStrictEqual([true, false]);
      expect(nextCheckedValues(true, false)).toStrictEqual([true, true]);
      expect(nextCheckedValues(false, true)).toStrictEqual([true, false]);
    });
  });

  describe('Uncontrolled', () => {
    it('should have indeterminate state by default', () => {
      const { container } = renderWithProvider(
        <CheckboxTristate>Label</CheckboxTristate>,
      );
      expect(
        container.querySelector('.ant-checkbox-indeterminate'),
      ).toBeTruthy();
    });

    it('after clicking it should set proper states', () => {
      const { container, queryByLabelText } = renderWithProvider(
        <CheckboxTristate>Label</CheckboxTristate>,
      );
      const input = queryByLabelText('Label') as HTMLInputElement;

      // First click
      fireEvent.click(input);
      expect(container.querySelector(SELECTOR_FALSE)).toBeTruthy();

      // Second click
      fireEvent.click(input);
      expect(container.querySelector(SELECTOR_TRUE)).toBeTruthy();

      // Third click - go back to indeterminate
      fireEvent.click(input);
      expect(container.querySelector(SELECTOR_INDETERMINATE)).toBeTruthy();
    });
  });

  describe('Controlled', () => {
    it('should not be able to change state if controlled', () => {
      const { container, queryByLabelText } = renderWithProvider(
        <CheckboxTristate checked={false}>Label</CheckboxTristate>,
      );
      const input = queryByLabelText('Label') as HTMLInputElement;

      fireEvent.click(input);
      expect(container.querySelector(SELECTOR_FALSE)).toBeTruthy();

      // Hit me baby one more time just to be 99% sure
      fireEvent.click(input);
      expect(container.querySelector(SELECTOR_FALSE)).toBeTruthy();

      // OCD man! Check it even third time! :D
      fireEvent.click(input);
      expect(container.querySelector(SELECTOR_FALSE)).toBeTruthy();
    });

    it('should change checkbox when prop changes', () => {
      const { rerender, container } = renderWithProvider(
        <CheckboxTristate checked={false}>Label</CheckboxTristate>,
      );
      expect(container.querySelector(SELECTOR_FALSE)).toBeTruthy();

      rerender(<CheckboxTristate checked>Label</CheckboxTristate>);
      expect(container.querySelector(SELECTOR_TRUE)).toBeTruthy();

      rerender(<CheckboxTristate checked={undefined}>Label</CheckboxTristate>);
      expect(container.querySelector(SELECTOR_INDETERMINATE)).toBeTruthy();
    });

    it('should change checkbox from indeterminate (undefined) to other states', () => {
      const { rerender, container } = renderWithProvider(
        <CheckboxTristate checked={true}>Label</CheckboxTristate>,
      );

      rerender(<CheckboxTristate checked={undefined}>Label</CheckboxTristate>);
      expect(container.querySelector(SELECTOR_INDETERMINATE)).toBeTruthy();

      rerender(<CheckboxTristate checked>Label</CheckboxTristate>);
      expect(container.querySelector(SELECTOR_TRUE)).toBeTruthy();

      rerender(<CheckboxTristate checked={undefined}>Label</CheckboxTristate>);
      expect(container.querySelector(SELECTOR_INDETERMINATE)).toBeTruthy();

      rerender(<CheckboxTristate checked={false}>Label</CheckboxTristate>);
      expect(container.querySelector(SELECTOR_FALSE)).toBeTruthy();
    });
  });
});
