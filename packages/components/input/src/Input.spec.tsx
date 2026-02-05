import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './index';

describe('Input', () => {
  const onChange = jest.fn();
  const PLACEHOLDER = 'placeholder';
  const INPUT_VALUE = 'input value';
  const TOOLTIP = 'tooltip text';

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Input', () => {
    it('should render', () => {
      renderWithProvider(<Input placeholder={PLACEHOLDER} value="" />);

      expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeInTheDocument();
    });

    it('should trigger onChange', () => {
      renderWithProvider(
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          placeholder={PLACEHOLDER}
          value=""
        />,
      );
      const input = screen.getByPlaceholderText(
        PLACEHOLDER,
      ) as HTMLInputElement;

      fireEvent.change(input, { target: { value: INPUT_VALUE } });

      expect(onChange).toBeCalledWith(INPUT_VALUE);
    });

    it('should show label', () => {
      const LABEL = 'label';
      renderWithProvider(<Input label={LABEL} value="" />);

      expect(screen.getByText(LABEL)).toBeInTheDocument();
    });

    it('should show error', () => {
      const ERROR = 'error';
      renderWithProvider(<Input errorText={ERROR} value="" />);

      expect(screen.getByText(ERROR)).toBeInTheDocument();
    });

    it('should show description', () => {
      const DESCRIPTION = 'description';
      renderWithProvider(<Input description={DESCRIPTION} value="" />);

      expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
    });

    it('should count characters', () => {
      const COUNTER_LIMIT = 10;
      const { rerender } = renderWithProvider(
        <Input
          placeholder={PLACEHOLDER}
          counterLimit={COUNTER_LIMIT}
          value=""
        />,
      );

      expect(screen.getByTestId('counter').textContent).toBe(
        `0/${COUNTER_LIMIT}`,
      );

      rerender(
        <Input
          placeholder={PLACEHOLDER}
          counterLimit={COUNTER_LIMIT}
          value="test"
        />,
      );

      expect(screen.getByTestId('counter').textContent).toBe(
        `4/${COUNTER_LIMIT}`,
      );
    });

    it('should not allow to exceed counterLimit', () => {
      const COUNTER_LIMIT = 2;
      const VALID_STRING = 'ab';
      const INVALID_STRING = 'abc';
      renderWithProvider(
        <Input
          placeholder={PLACEHOLDER}
          counterLimit={COUNTER_LIMIT}
          value=""
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
        />,
      );
      const input = screen.getByPlaceholderText(
        PLACEHOLDER,
      ) as HTMLInputElement;

      fireEvent.change(input, { target: { value: VALID_STRING } });

      expect(onChange).toHaveBeenCalledWith(VALID_STRING);

      fireEvent.change(input, { target: { value: INVALID_STRING } });

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should render icons', () => {
      const ICON_PLACEHOLDER_1 = 'Icon placeholder 1';
      const ICON_PLACEHOLDER_2 = 'Icon placeholder 2';
      renderWithProvider(
        <Input
          icon1={<div>{ICON_PLACEHOLDER_1}</div>}
          icon2={<div>{ICON_PLACEHOLDER_2}</div>}
          value=""
        />,
      );

      expect(screen.getByText(ICON_PLACEHOLDER_1)).toBeInTheDocument();
      expect(screen.getByText(ICON_PLACEHOLDER_2)).toBeInTheDocument();
    });
  });

  describe('Autosize input', () => {
    it.todo('[??] min max width applies only for autosize');
    it.todo(
      '[??] proper styles (;) in autosize obj parser (there was a bug in styled components with css`` macro)',
    );

    it('input does not loose focus after input event (when in e.g. autosize mode) - all rendering helpers renderInputComponent get cached (memoized)', async () => {
      const onBlur = jest.fn();
      const onInput = jest.fn();
      renderWithProvider(
        <Input
          autoResize={{ maxWidth: '200px', minWidth: '100px' }}
          placeholder={PLACEHOLDER}
          onBlur={onBlur}
          onInput={onInput}
          value=""
        />,
      );

      const input = screen.getByPlaceholderText(
        PLACEHOLDER,
      ) as HTMLInputElement;
      expect(input).toBeInTheDocument();
      await userEvent.type(input, INPUT_VALUE);

      expect(onBlur).not.toBeCalled();
      expect(onInput).toBeCalled();
    });

    it('autosize works with prefixel suffixel (e.g. renderInputComponent)', () => {
      const PREFIX = 'Prefix value';
      const SUFFIX = 'Suffix value';
      renderWithProvider(
        <Input
          autoResize={{ maxWidth: '200px', minWidth: '100px' }}
          placeholder={PLACEHOLDER}
          value=""
          prefixel={PREFIX}
          suffixel={SUFFIX}
        />,
      );

      expect(screen.getByText(PREFIX)).toBeInTheDocument();
      expect(screen.getByText(SUFFIX)).toBeInTheDocument();
    });

    it.todo(
      '[performance / integration] nested input does not get rerendered when props objects differ in object referentiality',
    );
    it.todo('[UI] autosize obj should support unlimited maxwidth');
    it.todo('[UI] autosize input works in modal');
    it.todo(
      '[UI] autosize sizer does not expand parent containers (e.g. modals)',
    );
    it.todo(
      '[UI] input with and without autoresize paddings and margins are the same (content-box vs border-box)',
    );
    it.todo('[UI] autosize has no transition on width');
    it.todo(
      '[UI] autosize when resizing is aware of its parent size (problematic when inside modal)',
    );
    it.todo(
      '[UI] resize accordingly to the input text width up to given width if prop autoResize',
    );
  });

  describe('Expandable input', () => {
    beforeEach(() => {
      jest
        .spyOn(HTMLInputElement.prototype, 'scrollWidth', 'get')
        .mockReturnValue(200);
      jest
        .spyOn(HTMLInputElement.prototype, 'clientWidth', 'get')
        .mockReturnValue(100);
    });

    it('should render expand icon and texarea', () => {
      renderWithProvider(<Input expandable value="" />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      const textarea = screen.getByTestId(
        'inputExpandTextarea',
      ) as HTMLTextAreaElement;
      const trigger = screen.getByTestId('ds-input-icon-expand');
      expect(trigger).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(textarea).toBeInTheDocument();
    });
    it('should show expand tooltip', async () => {
      renderWithProvider(
        <Input expandable expandableTooltip={TOOLTIP} value="" />,
      );
      const trigger = screen.getByTestId('ds-input-icon-expand');
      expect(trigger).toBeInTheDocument();

      await userEvent.hover(trigger);
      await waitFor(async() => expect(await screen.findByText(TOOLTIP)).toBeInTheDocument());
    });
  });
  // autosize doesn't support masked input yet
  // it.todo('masked-input forwardsRef (requires antd>=4.19)')
  it.todo('[UI] autosize works for masked input');
  it.todo('[??] autosize with masked input allows polish characters ąśćłźóń');
});
