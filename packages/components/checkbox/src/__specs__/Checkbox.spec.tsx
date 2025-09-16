import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent } from '@testing-library/react';

import Checkbox from '../index';

describe('Checkbox', () => {
  const CHECKBOX_LABEL = 'Checkbox Label';
  const onChange = jest.fn();

  it('should render', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Checkbox onChange={onChange}>{CHECKBOX_LABEL}</Checkbox>,
    );

    // ASSERT
    expect(getByText(CHECKBOX_LABEL)).toBeTruthy();
  });

  it('clicking input should trigger onChange event', () => {
    // ARRANGE
    const { getByLabelText } = renderWithProvider(
      <Checkbox onChange={onChange}>{CHECKBOX_LABEL}</Checkbox>,
    );

    // ACT
    fireEvent.click(getByLabelText(CHECKBOX_LABEL));

    // ASSERT
    expect(onChange).toBeCalled();
  });

  it('clicking label should trigger onChange event', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Checkbox onChange={onChange}>{CHECKBOX_LABEL}</Checkbox>,
    );

    // ACT
    fireEvent.click(getByText(CHECKBOX_LABEL));

    // ASSERT
    expect(onChange).toBeCalled();
  });

  it('should render error message and mark checkbox with error', () => {
    // ARRANGE
    const ERROR_TEXT = 'error text';
    const { getByText, container } = renderWithProvider(
      <Checkbox errorText={ERROR_TEXT}>{CHECKBOX_LABEL}</Checkbox>,
    );

    // ASSERT
    expect(container.querySelector('label.error')).toBeTruthy();
    expect(getByText(ERROR_TEXT)).toBeTruthy();
  });

  it('should render description', () => {
    // ARRANGE
    const DESCRIPTION_TEXT = 'description text';
    const { getByText } = renderWithProvider(
      <Checkbox description={DESCRIPTION_TEXT}>{CHECKBOX_LABEL}</Checkbox>,
    );

    // ASSERT
    expect(getByText(DESCRIPTION_TEXT)).toBeTruthy();
  });

  it('should handle disabling', () => {
    // ARRANGE
    const { container } = renderWithProvider(
      <Checkbox disabled>{CHECKBOX_LABEL}</Checkbox>,
    );

    // ASSERT
    expect(
      container.getElementsByTagName('input')[0].hasAttribute('disabled'),
    ).toBeTruthy();
  });

  describe('Checkbox.Group', () => {
    it('should trigger onChange', () => {
      // ARRANGE
      const CHECKBOX_LABEL_A = 'CHECKBOX_LABEL_A';
      const CHECKBOX_VALUE_A = 'CHECKBOX_VALUE_A';
      const CHECKBOX_LABEL_B = 'CHECKBOX_LABEL_B';
      const CHECKBOX_VALUE_B = 'CHECKBOX_VALUE_B';
      const groupOnChange = jest.fn();

      const { getByLabelText } = renderWithProvider(
        <Checkbox.Group onChange={groupOnChange}>
          <Checkbox value={CHECKBOX_VALUE_A}>{CHECKBOX_LABEL_A}</Checkbox>
          <Checkbox value={CHECKBOX_VALUE_B}>{CHECKBOX_LABEL_B}</Checkbox>
        </Checkbox.Group>,
      );

      // ACT
      fireEvent.click(getByLabelText(CHECKBOX_LABEL_A));

      // ASSERT
      expect(groupOnChange).toHaveBeenCalledWith([CHECKBOX_VALUE_A]);

      // ACT
      fireEvent.click(getByLabelText(CHECKBOX_LABEL_B));

      // ASSERT
      expect(groupOnChange).toHaveBeenCalledWith([
        CHECKBOX_VALUE_A,
        CHECKBOX_VALUE_B,
      ]);
    });
  });
});
