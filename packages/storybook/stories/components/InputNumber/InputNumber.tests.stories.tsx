import { Meta, StoryObj } from '@storybook/react-webpack5';
import { within, waitFor, userEvent, fn, expect, fireEvent } from 'storybook/test';

import type { InputProps } from '@synerise/ds-input';
import { InputNumberProps } from '@synerise/ds-input-number';
import { fixedWrapper200, sleep } from '../../utils';

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
    const btn = canvas.getByLabelText('Increase Value');
    userEvent.click(input);

    await waitFor(() => expect(input).toHaveFocus());
    await waitFor(() => expect(btn).toBeVisible());
  },
};
export const InputNumberHover: StoryObj<InputNumberProps> = {
  parameters: {
    pseudo: { hover: true },
  }
};
