import React, { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import type { Emoji } from 'unicode-emoji-utils';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import EmojiPicker, { EmojiPickerProps } from '@synerise/ds-emoji-picker';
import Icon, { EmoticonsM } from '@synerise/ds-icon';
import { Input } from '@synerise/ds-input';

import {
  BOOLEAN_CONTROL,
  centeredPaddedWrapper,
  fixedWrapper300,
  sleep,
} from '../../utils';
import { Default, InputWithEmojiPicker } from './EmojiPicker.stories';

export default {
  component: EmojiPicker,
  title: 'Components/Pickers/EmojiPicker/Tests',
  tags: ['visualtests'],
  parameters: {
    layout: 'padded',
  },
  decorators: [fixedWrapper300, centeredPaddedWrapper],
  args: {
    onSelect: fn(),
    closeOnSelect: true,
    children: <Button>custom trigger</Button>,
  },
  argTypes: {
    closeOnSelect: BOOLEAN_CONTROL,
    children: { control: false },
  },
} as Meta<EmojiPickerProps>;

const PLACEHOLDER = 'Search';
export const Open: StoryObj<EmojiPickerProps> = {
  ...Default,
  args: {
    ...Default.args,
    texts: {
      placeholder: PLACEHOLDER,
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(canvas.getByRole('button'));

    expect(await canvas.findByPlaceholderText(PLACEHOLDER)).toBeInTheDocument();

    await sleep(500);
  },
};

export const Search: StoryObj<EmojiPickerProps> = {
  ...Default,
  args: {
    ...Default.args,
    texts: {
      placeholder: PLACEHOLDER,
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(canvas.getByRole('button'));

    userEvent.type(await canvas.findByPlaceholderText(PLACEHOLDER), 'grin');

    await sleep(500);
  },
};

export const PopulateInput: StoryObj<EmojiPickerProps> = {
  ...InputWithEmojiPicker,
  args: {
    ...Default.args,
    closeOnSelect: false,
    texts: {
      placeholder: PLACEHOLDER,
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(canvas.getByTestId('emoji-icon-trigger'));

    await userEvent.click(canvas.getAllByTestId('ds-emoji-item')[0]);
    await userEvent.click(canvas.getAllByTestId('ds-emoji-item')[3]);
    await userEvent.click(canvasElement.parentElement!);

    await sleep(500);
  },
};
