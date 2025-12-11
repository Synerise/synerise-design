import React, { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
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
} from '../../utils';

export default {
  component: EmojiPicker,
  title: 'Components/Pickers/EmojiPicker',
  tags: ['autodocs', 'new'],
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

export const Default: StoryObj<EmojiPickerProps> = {};

export const InputWithEmojiPicker: StoryObj<EmojiPickerProps> = {
  render: (args) => {
    const [inputValue, setInputValue] = useState('');
    const handleSelectEmoji = (emoji: Emoji) => {
      setInputValue(`${inputValue}${emoji.emoji}`);
      args.onSelect?.(emoji);
    };
    const Picker = (
      <EmojiPicker {...args} onSelect={handleSelectEmoji}>
        <Icon
          data-testid="emoji-icon-trigger"
          color={theme.palette['grey-600']}
          component={<EmoticonsM />}
        />
      </EmojiPicker>
    );
    return (
      <Input
        value={inputValue}
        icon1={Picker}
        onChange={(event) => setInputValue(event.target.value)}
      />
    );
  },
  args: {
    closeOnSelect: false,
  },
};
