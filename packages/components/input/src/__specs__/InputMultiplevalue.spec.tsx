import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from '@testing-library/react';
import { InputMultivalue } from '../index';

describe('Input', () => {
  const onChange = jest.fn();

  describe('Input multivalue', () => {

    // FIX this test
    it.skip('should trigger onChange', () => {
      // ARRANGE
      const PLACEHOLDER = 'S.BorderLessInput';
      const INPUT_VALUE = 'valueA';
      const { getByPlaceholderText, container } = renderWithProvider(
        <InputMultivalue
          onChange={(values) => onChange(values)}
          values={["valueA", "valueB"]}
        />
      );
      const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

      // ACT
      fireEvent.keyDown(input, INPUT_VALUE);
      fireEvent.keyDown(container, 'Enter');

      // ASSERT
      expect(onChange).toBeCalledWith(INPUT_VALUE);
    })
  })
})
