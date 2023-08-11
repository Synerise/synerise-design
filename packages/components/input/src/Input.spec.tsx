import * as React from 'react';

import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './index';

describe('Input', () => {
  const onChange = jest.fn();
  const PLACEHOLDER = 'placeholder';
  
  const INPUT_VALUE = 'input value';

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Input', () => {
    it('should render', () => {
      // ARRANGE
      renderWithProvider(<Input placeholder={PLACEHOLDER} value="" />);

      // ASSERT
      expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
    });

    it('should trigger onChange', () => {
      // ARRANGE
      
      renderWithProvider(
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
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
      renderWithProvider(<Input label={LABEL} value="" />);

      // ASSERT
      expect(screen.getByText(LABEL)).toBeTruthy();
    });

    it('should show error', () => {
      // ARRANGE
      const ERROR = 'error';
      renderWithProvider(<Input errorText={ERROR} value="" />);

      // ASSERT
      expect(screen.getByText(ERROR)).toBeTruthy();
    });

    it('should show description', () => {
      // ARRANGE
      const DESCRIPTION = 'description';
      renderWithProvider(<Input description={DESCRIPTION} value="" />);

      // ASSERT
      expect(screen.getByText(DESCRIPTION)).toBeTruthy();
    });

    it('should count characters', () => {
      // ARRANGE
      const COUNTER_LIMIT = 10;
      const { rerender } = renderWithProvider(
        <Input placeholder={PLACEHOLDER} counterLimit={COUNTER_LIMIT} value="" />
      );

      // ASSERT
      expect(screen.getByTestId('counter').textContent).toBe(`0/${COUNTER_LIMIT}`);

      // ACT
      rerender(<Input placeholder={PLACEHOLDER} counterLimit={COUNTER_LIMIT} value="test" />);

      // ASSERT
      expect(screen.getByTestId('counter').textContent).toBe(`4/${COUNTER_LIMIT}`);
    });

    it('should not allow to exceed counterLimit', () => {
      // ARRANGE
      const COUNTER_LIMIT = 2;
      const VALID_STRING = 'ab';
      const INVALID_STRING = 'abc';
      renderWithProvider(
        <Input
          placeholder={PLACEHOLDER}
          counterLimit={COUNTER_LIMIT}
          value=""
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
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
        <Input icon1={<div>{ICON_PLACEHOLDER_1}</div>} icon2={<div>{ICON_PLACEHOLDER_2}</div>} value="" />
      );

      // ASSERT
      expect(screen.getByText(ICON_PLACEHOLDER_1)).toBeTruthy();
      expect(screen.getByText(ICON_PLACEHOLDER_2)).toBeTruthy();
    });
  });

  describe('Autosize input', () => {
    it.todo('[??] min max width applies only for autosize')
    it.todo('[??] proper styles (;) in autosize obj parser (there was a bug in styled components with css`` macro)')
    
    it('input does not loose focus after input event (when in e.g. autosize mode) - all rendering helpers renderInputComponent get cached (memoized)', () => {
      const onBlur = jest.fn();
      const onInput = jest.fn();
      renderWithProvider(
        <Input
          autoResize={{maxWidth: '200px', minWidth: '100px'}}
          placeholder={PLACEHOLDER}
          onBlur={onBlur}
          onInput={onInput}
          value=""
        />
      );
      
      const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
      expect(input).toBeInTheDocument()
      userEvent.type(input, INPUT_VALUE);
      
      expect(onBlur).not.toBeCalled();
      expect(onInput).toBeCalled();
    });
    
    it('autosize works with prefixel suffixel (e.g. renderInputComponent)', () => {
      const PREFIX = 'Prefix value';
      const SUFFIX = 'Suffix value';
      renderWithProvider(
        <Input
          autoResize={{maxWidth: '200px', minWidth: '100px'}}
          placeholder={PLACEHOLDER}
          value=""
          prefixel={PREFIX}
          suffixel={SUFFIX}
        />
      );

      // ASSERT
      expect(screen.getByText(PREFIX)).toBeTruthy();
      expect(screen.getByText(SUFFIX)).toBeTruthy();
    })

    it.todo('[performance / integration] nested input does not get rerendered when props objects differ in object referentiality');
      
      

    it.todo('[UI] autosize obj should support unlimited maxwidth')
    it.todo('[UI] autosize input works in modal')
    it.todo('[UI] autosize sizer does not expand parent containers (e.g. modals)')
    it.todo('[UI] input with and without autoresize paddings and margins are the same (content-box vs border-box)')
    it.todo('[UI] autosize has no transition on width')
    it.todo('[UI] autosize when resizing is aware of its parent size (problematic when)') // when what?
    it.todo('[UI] resize accordingly to the input text width up to given width if prop autoResize')
  });
  
  // autosize doesn't support masked input yet
  // it.todo('masked-input forwardsRef (requires antd>=4.19)')
  it.todo('[UI] autosize works for masked input')
  it.todo('[??] autosize with masked input allows polish characters ąśćłźóń');
});
