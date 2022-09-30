import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from '@testing-library/react';
import { InputMultivalue } from '../index';

describe('Input', () => {
  const onChange = jest.fn();

  describe('Input multivalue', () => {

    // FIX this test
    it('should trigger onChange', () => {
      // ARRANGE
      const PLACEHOLDER = 'S.BorderLessInput';
      const INPUT_VALUE = 'valueA';
      const initialValues = ["valueA", "valueB"]
      const { container } = renderWithProvider(
        <InputMultivalue
          onChange={(values) => onChange(values)}
          values={initialValues}
          placeholder={PLACEHOLDER}
        />
      );
      const input = container.querySelector('input') as HTMLInputElement;

      // ACT
      fireEvent.change(input, { target: { value: INPUT_VALUE } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

      // ASSERT
      expect(onChange).toBeCalledWith([...initialValues,INPUT_VALUE]);
    })
    it('should delete value after backspace', () => {
      const PLACEHOLDER = 'S.BorderLessInput';
      const initialValues = ["valueA", "valueB"]
      const { container } = renderWithProvider(
        <InputMultivalue
          onChange={(values) => onChange(values)}
          values={initialValues}
          placeholder={PLACEHOLDER}
        />
      );
      const input = container.querySelector('input') as HTMLInputElement;

      fireEvent.keyDown(input, { key: 'Backspace', code: 'Backspace' });

      expect(onChange).toBeCalledWith([...initialValues.slice(0,-1)]);
    })
    it('should change value by click on value ', () => {
      const PLACEHOLDER = 'S.BorderLessInput';
      const INPUT_VALUE = 'valueC';
      const initialValues = ["valueA", "valueB"]
      const { container } = renderWithProvider(
        <InputMultivalue
          onChange={(values) => onChange(values)}
          values={initialValues}
          placeholder={PLACEHOLDER}
        />
      );
      const tag = container.querySelector('.ds-input-value-wrapper') as HTMLInputElement;
      console.log(tag,'tags');
      fireEvent.click(tag);

      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.change(input, { target: { value: INPUT_VALUE } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });


      expect(onChange).toBeCalledWith([...initialValues,INPUT_VALUE]);
    })
  })
})
