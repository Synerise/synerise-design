import * as React from 'react';

import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, screen } from '@testing-library/react';

import { TextArea } from '../index';

describe('TextArea', () => {
    const PLACEHOLDER = 'placeholder';
    const onChange = jest.fn();
    const INPUT_VALUE = 'input value';
    
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render', () => {
      // ARRANGE
      renderWithProvider(<TextArea placeholder={PLACEHOLDER} value="" />);

      // ASSERT
      expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
    });

    it('should trigger onChange', () => {
      // ARRANGE
      renderWithProvider(
        <TextArea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          placeholder={PLACEHOLDER}
          value=""
        />
      );

      const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

      // ACT
      fireEvent.change(input, { target: { value: INPUT_VALUE } });

      // ASSERT
      expect(onChange).toBeCalledWith(INPUT_VALUE);
    });

    it('should show label', () => {
      // ARRANGE
      const LABEL = 'label';
      renderWithProvider(<TextArea label={LABEL} value="" />);

      // ASSERT
      expect(screen.getByText(LABEL)).toBeTruthy();
    });

    it('should show error', () => {
      // ARRANGE
      const ERROR = 'error';
      renderWithProvider(<TextArea errorText={ERROR} value="" />);

      // ASSERT
      expect(screen.getByText(ERROR)).toBeTruthy();
    });

    it('should show description', () => {
      // ARRANGE
      const DESCRIPTION = 'description';
      renderWithProvider(<TextArea description={DESCRIPTION} value="" />);

      // ASSERT
      expect(screen.getByText(DESCRIPTION)).toBeTruthy();
    });

    it('should count characters', () => {
      // ARRANGE
      
      const COUNTER_LIMIT = 10;
      const { rerender } = renderWithProvider(
        <TextArea placeholder={PLACEHOLDER} counterLimit={COUNTER_LIMIT} value="" />
      );

      // ASSERT
      expect(screen.getByTestId('counter').textContent).toBe(`0/${COUNTER_LIMIT}`);

      // ACT
      rerender(<TextArea placeholder={PLACEHOLDER} counterLimit={COUNTER_LIMIT} value="test" />);

      // ASSERT
      expect(screen.getByTestId('counter').textContent).toBe(`4/${COUNTER_LIMIT}`);
    });

    it('should not allow to exceed counterLimit', () => {
      // ARRANGE
      const COUNTER_LIMIT = 2;
      const VALID_STRING = 'ab';
      const INVALID_STRING = 'abc';

      renderWithProvider(
        <TextArea
          placeholder={PLACEHOLDER}
          counterLimit={COUNTER_LIMIT}
          value=""
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        />
      );
      const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

      // ACT
      fireEvent.change(input, { target: { value: VALID_STRING } });

      // ASSERT
      expect(onChange).toHaveBeenCalledWith(VALID_STRING);

      // ACT
      fireEvent.change(input, { target: { value: INVALID_STRING } }); // should not call onChange event

      // ASSERT
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should render icons', () => {
      // ARRANGE
      const ICON_PLACEHOLDER_1 = 'Icon placeholder 1';
      const ICON_PLACEHOLDER_2 = 'Icon placeholder 2';
      renderWithProvider(
        <TextArea icon1={<div>{ICON_PLACEHOLDER_1}</div>} icon2={<div>{ICON_PLACEHOLDER_2}</div>} value="" />
      );

      // ASSERT
      expect(screen.getByText(ICON_PLACEHOLDER_1)).toBeTruthy();
      expect(screen.getByText(ICON_PLACEHOLDER_2)).toBeTruthy();
    });
  });