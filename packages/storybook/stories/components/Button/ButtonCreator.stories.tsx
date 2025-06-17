import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import type { CreatorProps } from '@synerise/ds-button';
import { fixedWrapper400, BOOLEAN_CONTROL, controlFromOptionsArray, STRING_CONTROL, CLASSNAME_ARG_CONTROL } from '../../utils';

const meta: Meta<CreatorProps> = {
  title: 'Components/Button/Creator',
  tags: ['autodocs'],
  decorators: [fixedWrapper400],
  component: Button.Creator,
  argTypes: {
    status: {
      ...controlFromOptionsArray('select', ['default', 'error', 'upload'])
    },
    label: STRING_CONTROL,
    block: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    className: CLASSNAME_ARG_CONTROL
  },
};

export default meta;

export const Creator: StoryObj<CreatorProps> = {
  render: (args) => (
    <Button.Creator {...args} />
  )
}


export const CreatorWithLabel: StoryObj<CreatorProps> = {
  ...Creator,
  args: {
    label: 'Label',
  },
}


export const CreatorBlock: StoryObj<CreatorProps> = {
  ...Creator,
  args: {
    label: 'Label',
    block: true
  },
}
