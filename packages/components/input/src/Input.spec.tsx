import * as React from 'react';
import { range } from 'lodash';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, prettyDOM, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './index';

describe('Input', () => {
  const onChange = jest.fn();
  const PLACEHOLDER = 'placeholder';

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
      const INPUT_VALUE = 'input value';
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
    it.todo('resize accordingly to the input text width up to given width if prop autoResize')
    it.todo('autosize works for masked input')
    it.todo('autosize with masked input allows polish characters ąśćłźóń')
    // it.todo('masked-input forwardsRef (requires antd>=4.19)')
    it.todo('min max width applies only for autosize')
    it.todo('autosize input works in modal')
    it('autosize sizer does not expand parent containers (e.g. modals)', async () => {
      
      const INPUT_VALUE = range(0,10).map(i => 'input value').join(' ');
      
      renderWithProvider(
        <div data-testID="parent" style={{width: '200px'}}>
          <Input
            autoResize={{maxWidth: '300px', minWidth: '100px'}}
            placeholder={PLACEHOLDER}
            value={INPUT_VALUE}
          />
        </div>
      );
      
      const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
      expect(input).toBeInTheDocument();

      const inputSizer = input.nextElementSibling;
      expect(inputSizer).toBeTruthy();

      const parent = screen.getByTestId('parent');
      expect(parent).toBeInTheDocument();
      
      const parentWidth = getComputedStyle(parent).getPropertyValue('width');
      const inputWidth = getComputedStyle(input).getPropertyValue('width');
      const inputSizerWidth = getComputedStyle(inputSizer as HTMLInputElement).getPropertyValue('width');
      if (parent) {
        console.log(prettyDOM(parent));
        console.debug('input.value', input.value, parentWidth, parent.clientWidth, inputWidth, input.clientWidth, inputSizerWidth, inputSizer?.clientWidth, 's');
      }

      expect(input.value).toBe(INPUT_VALUE)
      
    })
    it.todo('proper styles (;) in autosize obj parser (there was a bug in styled components with css`` macro)')
    it.todo('autosize obj should support unlimited maxwidth')
    it.todo('autosize works with prefixel suffixel (e.g. renderInputComponent)')
    it('input does not loose focus after input event (when in e.g. autosize mode) - all rendering helpers renderInputComponent get cached (memoized)', () => {
      
      const INPUT_VALUE = 'input value';
      const onBlur = jest.fn();
      const onInput = jest.fn();
      renderWithProvider(
        <>
          <Input
            autoResize={{maxWidth: '200px', minWidth: '100px'}}
            placeholder={PLACEHOLDER}
            onBlur={onBlur}
            onInput={onInput}
            value=""
          />
        </>
      );
      
      const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
      
      userEvent.type(input, INPUT_VALUE);
      
      expect(onBlur).not.toBeCalled();
      expect(onInput).toBeCalled();


    })
    it.todo('nested input does not get rerendered when props objects differ in object referentiality')
    it('input with and without autoresize paddings and margins are the same (content-box vs border-box)', () => {
      
      const cssProperties = ['padding-left', 'padding-top', 'padding-right', 'padding-bottom', 'margin-left', 'margin-top', 'margin-right', 'margin-bottom']
      renderWithProvider(
        <>
          <Input
            autoResize={{maxWidth: '200px', minWidth: '100px'}}
            placeholder={PLACEHOLDER}
            value=""
          />
          <Input
            placeholder={PLACEHOLDER+PLACEHOLDER}
            value=""
          />
        </>
        
      );
      const inputAutoSize = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
      const input = screen.getByPlaceholderText(PLACEHOLDER+PLACEHOLDER) as HTMLInputElement;

      const inputAutoSizeStyle = getComputedStyle(inputAutoSize);
      const inputStyle = getComputedStyle(input);
      cssProperties.forEach(prop => {
        console.debug(prop, inputStyle.getPropertyValue(prop))
        expect(inputStyle.getPropertyValue(prop)).toBe(inputAutoSizeStyle.getPropertyValue(prop));
      });
      
    })
    it.todo('autosize has no transition on width')
    it.todo('autosize when resizing is aware of its parent size (problematic when)')
  });
});
