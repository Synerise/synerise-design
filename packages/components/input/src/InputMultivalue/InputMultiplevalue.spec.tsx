import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, screen } from '@testing-library/react';
import { InputMultivalue } from '../index';
import userEvent from '@testing-library/user-event';

describe('Input', () => {
  const onChange = jest.fn();

  describe('Input multivalue', () => {

    it('should trigger onChange', () => {
      const INPUT_VALUE = 'valueC';
      const values = ["valueA", "valueB"]
      renderWithProvider(
        <InputMultivalue
          onChange={(values) => onChange(values)}
          values={values}
        />
      );
      const input = screen.getByTestId('input-multivalue') as HTMLInputElement;
      expect(input).toBeInTheDocument();
      
      userEvent.type(input, INPUT_VALUE);
      fireEvent.keyDown(input, { 
        key: 'Enter', 
        keyCode: 13, 
        which: 13 
      });

      expect(onChange).toBeCalledWith([...values, INPUT_VALUE]);
    })
  })
})
