import { Meta, StoryObj } from '@storybook/react';
import { within, waitFor, userEvent, fn, expect, fireEvent } from '@storybook/test';

import type { InputProps } from '@synerise/ds-input';
import { InputNumberProps } from '@synerise/ds-input-number';
import { fixedWrapper200 } from '../../utils';

import StoriesMeta from './InputNumber.stories';

export default {
  ...StoriesMeta,
  title: 'Components/InputElements/Tests',
  tags: ['visualtests'],
} as Meta<InputProps>;

export const InputNumberFocus: StoryObj<InputNumberProps> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('spinbutton');
    userEvent.click(input);

    await waitFor(() => expect(input).toHaveFocus());
  },
};
export const InputNumberHover: StoryObj<InputNumberProps> = {
  parameters: {
    pseudo: { hover: true },
  },
};
