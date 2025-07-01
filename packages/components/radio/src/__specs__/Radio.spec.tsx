import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent } from '@testing-library/react';

import Radio from '../index';

describe('Radio', () => {
  it('should render', () => {
    // ARRANGE
    const RADIO_LABEL = 'Radio label';
    const { getByText } = renderWithProvider(<Radio>{RADIO_LABEL}</Radio>);

    // ASSERT
    expect(getByText(RADIO_LABEL)).toBeTruthy();
  });

  it('should render description', () => {
    // ARRANGE
    const RADIO_LABEL = 'Radio label';
    const RADIO_DESCRIPTION = 'Radio description';
    const { getByText } = renderWithProvider(
      <Radio description={RADIO_DESCRIPTION}>{RADIO_LABEL}</Radio>,
    );

    // ASSERT
    expect(getByText(RADIO_DESCRIPTION)).toBeTruthy();
  });

  describe('Radio.Group', () => {
    it('should trigger onChange', () => {
      // ARRANGE
      const onChange = jest.fn();
      const RADIO_LABEL_A = 'Radio label A';
      const RADIO_VALUE_A = 'Radio value A';
      const RADIO_LABEL_B = 'Radio label B';
      const RADIO_VALUE_B = 'Radio value B';

      const { getByLabelText } = renderWithProvider(
        <Radio.Group onChange={(e) => onChange(e.target.value)}>
          <Radio value={RADIO_VALUE_A}>{RADIO_LABEL_A}</Radio>
          <Radio value={RADIO_VALUE_B}>{RADIO_LABEL_B}</Radio>
        </Radio.Group>,
      );

      // ACT
      fireEvent.click(getByLabelText(RADIO_LABEL_A));

      // ASSERT
      expect(onChange).toHaveBeenCalledWith(RADIO_VALUE_A);

      // ACT
      fireEvent.click(getByLabelText(RADIO_LABEL_B));

      // ASSERT
      expect(onChange).toHaveBeenCalledWith(RADIO_VALUE_B);
    });
  });
});
