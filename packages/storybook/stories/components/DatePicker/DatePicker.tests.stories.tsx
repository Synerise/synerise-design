import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { within, userEvent, expect, fn, waitFor } from 'storybook/test';

import DatePicker from '@synerise/ds-date-picker';

import { BOOLEAN_CONTROL, fixedWrapper200, REACT_NODE_AS_STRING } from '../../utils';
import { baseArgs, texts } from './constants';
import { getPopupContainer } from '@synerise/ds-utils';

export default {
  component: DatePicker,
  title: 'Components/Pickers/DatePicker/Tests',
  tags: ['visualtests'],
  parameters: {
    date: new Date('March 10, 2021 10:00:00'),
  },
  decorators: [fixedWrapper200],
  render: args => {
    const [value, setValue] = useState<Date | undefined>(args.value);
    return (
      <div data-popup-container>
        <DatePicker
          {...args}
          onApply={newValue => {
            args.onApply?.(newValue);
            setValue(newValue);
          }}
          value={value}
        />
      </div>
    );
  },
  argTypes: {
    prefixel: {
      ...REACT_NODE_AS_STRING,
    },
    suffixel: {
      ...REACT_NODE_AS_STRING,
    },
    showTime: {
      ...BOOLEAN_CONTROL,
    },
    useEndOfDay: {
      ...BOOLEAN_CONTROL,
    },
    useStartOfDay: {
      ...BOOLEAN_CONTROL,
    },
  },
  args: {
    ...baseArgs,
    dropdownProps: { getPopupContainer },
    disabledDates: () => {
      return false;
    },
    onDropdownVisibleChange: fn(),
    onApply: fn(),
    onValueChange: fn(),
    value: new Date('2024-03-27T03:24:00'),
    showTime: true,
    useStartOfDay: true,
  },
} as Meta<typeof DatePicker>;

type Story = StoryObj<typeof DatePicker>;

export const RenderYearPicker: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Open picker popover', async () => {
      const input = canvas.getByPlaceholderText(texts.inputPlaceholder);
      await userEvent.click(input);
    });

    await waitFor(() => {
      expect(args.onDropdownVisibleChange).toHaveBeenCalled();
    });
    await waitFor(() => expect(canvas.getByText('2024')).not.toHaveStyle({ pointerEvents: 'none' }));
    await userEvent.click(canvas.getByText('2024'));
  },
};

export const RenderDecadePicker: Story = {
  play: async playParams => {
    const { args, canvasElement, step } = playParams;
    const canvas = within(canvasElement);
    await RenderYearPicker.play?.(playParams);

    await waitFor(() => expect(canvas.getByText('2020-2029')).not.toHaveStyle({ pointerEvents: 'none' }));
    await userEvent.click(canvas.getByText('2020-2029'));
  },
};

export const RenderMonthPicker: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Open picker popover', async () => {
      const input = canvas.getByPlaceholderText(texts.inputPlaceholder);
      await userEvent.click(input);
    });

    await waitFor(() => {
      expect(args.onDropdownVisibleChange).toHaveBeenCalled();
    });
    await waitFor(() => expect(canvas.getByText('Mar')).not.toHaveStyle({ pointerEvents: 'none' }));
    await userEvent.click(canvas.getByText('Mar'));
  },
};

export const SelectDateAndApply: Story = {
  args: {
    value: undefined,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Open picker popover', async () => {
      const input = canvas.getByPlaceholderText(texts.inputPlaceholder);
      await userEvent.click(input);
    });

    await waitFor(() => {
      expect(args.onDropdownVisibleChange).toHaveBeenCalled();
    });
    expect(canvas.getByTestId('date-picker-apply')).toBeDisabled();

    await waitFor(() => expect(canvas.getByText('18')).not.toHaveStyle({ pointerEvents: 'none' }));
    await userEvent.click(canvas.getByTestId('datapicker-nav-title-monthpicker-link'));

    await waitFor(() => expect(canvas.getByText('Jun')).not.toHaveStyle({ pointerEvents: 'none' }));
    await userEvent.click(canvas.getByText('Jun'));

    await userEvent.click(canvas.getByTestId('datapicker-nav-title-yearpicker-link'));
    await waitFor(() => expect(canvas.getByText('2024')).not.toHaveStyle({ pointerEvents: 'none' }));
    await userEvent.click(canvas.getByText('2022'));

    await userEvent.click(canvas.getByText('18'));
    await waitFor(async () => {
      expect(canvas.getByTestId('date-picker-apply')).not.toBeDisabled();
      await userEvent.click(canvas.getByTestId('date-picker-apply'));
      expect(args.onValueChange).toHaveBeenCalled();
      expect(args.onApply).toHaveBeenCalled();
    });
  },
};
