import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InputMultivalue } from '../index';

describe('Input', () => {
  const onChange = jest.fn();

  describe('Input multivalue', () => {
    it('should trigger onChange', () => {
      const INPUT_VALUE = 'valueC';
      const values = ['valueA', 'valueB'];
      renderWithProvider(
        <InputMultivalue onChange={onChange} values={values} />,
      );
      const input = screen.getByTestId('input-multivalue') as HTMLInputElement;
      expect(input).toBeInTheDocument();

      userEvent.type(input, INPUT_VALUE);
      fireEvent.keyDown(input, {
        key: 'Enter',
        keyCode: 13,
        which: 13,
      });

      expect(onChange).toBeCalledWith([...values, INPUT_VALUE]);
    });
  });
});
