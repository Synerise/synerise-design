import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { fn } from '@storybook/test';

import ColorPicker from '@synerise/ds-color-picker';

import { size } from '../ColorPicker/ColorPicker.data';
import {
  BOOLEAN_CONTROL,
  centeredPaddedWrapper,
  COLOR_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
} from '../../utils';

export default {
  title: 'Components/Pickers/ColorPicker',
  tags: ['autodocs'],
  component: ColorPicker,
  decorators: [centeredPaddedWrapper],
  render: args => {
    const [{ value, colors }, updateArgs] = useArgs();
    const handleChange = (newColor: string) => {
      updateArgs({ value: newColor });
      args.onChange?.(newColor);
    };

    const handleSaveColors = (newColors: string[]) => {
      updateArgs({ colors: newColors });
      args.onSaveColors?.(newColors);
    };

    return (
      <ColorPicker {...args} value={value} colors={colors} onSaveColors={handleSaveColors} onChange={handleChange} />
    );
  },
  argTypes: {
    description: REACT_NODE_AS_STRING,
    maxWidth: NUMBER_CONTROL,
    isShownSavedColors: BOOLEAN_CONTROL,
    errorText: REACT_NODE_AS_STRING,
    tooltip: REACT_NODE_AS_STRING,
    size: size,
    value: COLOR_CONTROL,
  },
  args: {
    onSaveColors: fn(),
    onChange: fn(),
  }
} as Meta<typeof ColorPicker>;

type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    value: '#00ffff',
    description: 'Description text',
    maxWidth: 228,
    size: 'S',
    isShownSavedColors: true,
    tooltip: { copy: 'Copy to clipboard', copied: 'Copied' },
  },
};

export const Minimalistic: Story = {
  args: {
    tooltip: { copy: 'Copy to clipboard', copied: 'Copied' },
  },
};

export const SavedColors: Story = {
  args: {
    isShownSavedColors: true,
    colors: ['#00ffff', '#fff', '#123123'],
    tooltip: { copy: 'Copy to clipboard', copied: 'Copied' },
  },
};
