import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from '@testing-library/react';
import { Input, TextArea } from '../index';

describe('Input', () => {
  const onChange = jest.fn();

  describe('Basic Input', () => {
    it('should render', () => {
      // ARRANGE
      const PLACEHOLDER = 'placeholder';
      const { getByPlaceholderText } = renderWithProvider(<Input placeholder={PLACEHOLDER} value="" />);

      // ASSERT
      expect(getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
    });

    it('should trigger onChange', () => {
      // ARRANGE
      const PLACEHOLDER = 'placeholder';
      const INPUT_VALUE = 'input value';
      const { getByPlaceholderText } = renderWithProvider(
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          placeholder={PLACEHOLDER}
          value=""
        />
      );
      const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

      // ACT
      fireEvent.change(input, { target: { value: INPUT_VALUE } });

      // ASSERT
      expect(onChange).toBeCalledWith(INPUT_VALUE);
    });

    it('should show label', () => {
      // ARRANGE
      const LABEL = 'label';
      const { getByText } = renderWithProvider(<Input label={LABEL} value="" />);

      // ASSERT
      expect(getByText(LABEL)).toBeTruthy();
    });

    it('should show error', () => {
      // ARRANGE
      const ERROR = 'error';
      const { getByText } = renderWithProvider(<Input errorText={ERROR} value="" />);

      // ASSERT
      expect(getByText(ERROR)).toBeTruthy();
    });

    it('should show description', () => {
      // ARRANGE
      const DESCRIPTION = 'description';
      const { getByText } = renderWithProvider(<Input description={DESCRIPTION} value="" />);

      // ASSERT
      expect(getByText(DESCRIPTION)).toBeTruthy();
    });

    it('should count characters', () => {
      // ARRANGE
      const PLACEHOLDER = 'placeholder';
      const COUNTER_LIMIT = 10;
      const { getByTestId, rerender } = renderWithProvider(
        <Input placeholder={PLACEHOLDER} counterLimit={COUNTER_LIMIT} value="" />
      );

      // ASSERT
      expect(getByTestId('counter').textContent).toBe(`0/${COUNTER_LIMIT}`);

      // ACT
      rerender(<Input placeholder={PLACEHOLDER} counterLimit={COUNTER_LIMIT} value="test" />);

      // ASSERT
      expect(getByTestId('counter').textContent).toBe(`4/${COUNTER_LIMIT}`);
    });

    it('should not allow to exceed counterLimit', () => {
      // ARRANGE
      const onChange = jest.fn();
      const PLACEHOLDER = 'placeholder';
      const COUNTER_LIMIT = 2;
      const VALID_STRING = 'ab';
      const INVALID_STRING = 'abc';
      const { getByPlaceholderText } = renderWithProvider(
        <Input
          placeholder={PLACEHOLDER}
          counterLimit={COUNTER_LIMIT}
          value=""
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        />
      );
      const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

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
      const { getByText } = renderWithProvider(
        <Input icon1={<div>{ICON_PLACEHOLDER_1}</div>} icon2={<div>{ICON_PLACEHOLDER_2}</div>} value="" />
      );

      // ASSERT
      expect(getByText(ICON_PLACEHOLDER_1)).toBeTruthy();
      expect(getByText(ICON_PLACEHOLDER_2)).toBeTruthy();
    });
  });

  describe('TextArea', () => {
    it('should render', () => {
      // ARRANGE
      const PLACEHOLDER = 'placeholder';
      const { getByPlaceholderText } = renderWithProvider(<TextArea placeholder={PLACEHOLDER} value="" />);

      // ASSERT
      expect(getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
    });

    it('should trigger onChange', () => {
      // ARRANGE
      const PLACEHOLDER = 'placeholder';
      const INPUT_VALUE = 'input value';
      const { getByPlaceholderText } = renderWithProvider(
        <TextArea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          placeholder={PLACEHOLDER}
          value=""
        />
      );

      const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

      // ACT
      fireEvent.change(input, { target: { value: INPUT_VALUE } });

      // ASSERT
      expect(onChange).toBeCalledWith(INPUT_VALUE);
    });

    it('should show label', () => {
      // ARRANGE
      const LABEL = 'label';
      const { getByText } = renderWithProvider(<TextArea label={LABEL} value="" />);

      // ASSERT
      expect(getByText(LABEL)).toBeTruthy();
    });

    it('should show error', () => {
      // ARRANGE
      const ERROR = 'error';
      const { getByText } = renderWithProvider(<TextArea errorText={ERROR} value="" />);

      // ASSERT
      expect(getByText(ERROR)).toBeTruthy();
    });

    it('should show description', () => {
      // ARRANGE
      const DESCRIPTION = 'description';
      const { getByText } = renderWithProvider(<TextArea description={DESCRIPTION} value="" />);

      // ASSERT
      expect(getByText(DESCRIPTION)).toBeTruthy();
    });

    it('should count characters', () => {
      // ARRANGE
      const PLACEHOLDER = 'placeholder';
      const COUNTER_LIMIT = 10;
      const { getByTestId, rerender } = renderWithProvider(
        <TextArea placeholder={PLACEHOLDER} counterLimit={COUNTER_LIMIT} value="" />
      );

      // ASSERT
      expect(getByTestId('counter').textContent).toBe(`0/${COUNTER_LIMIT}`);

      // ACT
      rerender(<TextArea placeholder={PLACEHOLDER} counterLimit={COUNTER_LIMIT} value="test" />);

      // ASSERT
      expect(getByTestId('counter').textContent).toBe(`4/${COUNTER_LIMIT}`);
    });

    it('should not allow to exceed counterLimit', () => {
      // ARRANGE
      const onChange = jest.fn();
      const PLACEHOLDER = 'placeholder';
      const COUNTER_LIMIT = 2;
      const VALID_STRING = 'ab';
      const INVALID_STRING = 'abc';
      const { getByPlaceholderText } = renderWithProvider(
        <TextArea
          placeholder={PLACEHOLDER}
          counterLimit={COUNTER_LIMIT}
          value=""
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        />
      );
      const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

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
      const { getByText } = renderWithProvider(
        <TextArea icon1={<div>{ICON_PLACEHOLDER_1}</div>} icon2={<div>{ICON_PLACEHOLDER_2}</div>} value="" />
      );

      // ASSERT
      expect(getByText(ICON_PLACEHOLDER_1)).toBeTruthy();
      expect(getByText(ICON_PLACEHOLDER_2)).toBeTruthy();
    });
  });
  it.todo('resize accordingly to the input text width up to given width if prop autoResize')
  it.todo('autosize works for masked input')
  it.todo('autosize with masked input allows polish characters ąśćłźóń')
  // it.todo('masked-input forwardsRef (requires antd>=4.19)')
  it.todo('min max width applies only for autosize')
  it.todo('autosize input works in modal')
  it.todo('autosize sizer does not expand parent containers (e.g. modals)')
  it.todo('proper styles (;) in autosize obj parser (there was a bug in styled components with css`` macro)')
  it.todo('autosize obj should support unlimited maxwidth')
  it.todo('autosize works with prefixel suffixel (e.g. renderInputComponent)')
  it.todo('input does not loose focus after input event (when in e.g. autosize mode) - all rendering helpers renderInputComponent get cached (memoized)')
  it.todo('nested input does not get rerendered when props objects differ in object referentiality')
  it.todo('input with and without autoreisze paddings and margins are the same (content-box vs border-box)')
  it.todo('autosize has no transition on width')
  it.todo('autosize when resizing is aware of its parent size (problematic when)')
});
