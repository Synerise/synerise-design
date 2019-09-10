import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Input from '../index';

describe('Input', () => {
  const onChange = jest.fn();

  describe('Basic Input', () => {
    it('should render', () => {
      // ARRANGE
      const PLACEHOLDER = 'placeholder';
      const { getByPlaceholderText } = render(<Input placeholder={PLACEHOLDER} />);

      // ASSERT
      expect(getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
    });

    it('should trigger onChange', () => {
      // ARRANGE
      const PLACEHOLDER = 'placeholder';
      const INPUT_VALUE = 'input value';
      const { getByPlaceholderText } = render(<Input onChange={e => onChange(e.target.value)} placeholder={PLACEHOLDER} />);

      const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

      // ACT
      fireEvent.change(getByPlaceholderText(PLACEHOLDER), { target: { value: INPUT_VALUE } });

      // ASSERT
      expect(input.value).toBe(INPUT_VALUE);
      expect(onChange).toBeCalledWith(INPUT_VALUE);
    });
  });

  describe('TextArea', () => {
    it('should render', () => {
      // ARRANGE
      const PLACEHOLDER = 'placeholder';
      const { getByPlaceholderText } = render(<Input.TextArea placeholder={PLACEHOLDER} />);

      // ASSERT
      expect(getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
    });

    it('should trigger onChange', () => {
      // ARRANGE
      const PLACEHOLDER = 'placeholder';
      const INPUT_VALUE = 'input value';
      const { getByPlaceholderText } = render(<Input.TextArea onChange={e => onChange(e.target.value)} placeholder={PLACEHOLDER} />);

      const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

      // ACT
      fireEvent.change(getByPlaceholderText(PLACEHOLDER), { target: { value: INPUT_VALUE } });

      // ASSERT
      expect(input.value).toBe(INPUT_VALUE);
      expect(onChange).toBeCalledWith(INPUT_VALUE);
    });
  });
});
