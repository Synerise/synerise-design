import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import type { StarButtonProps } from '@synerise/ds-button';
import { BOOLEAN_CONTROL, CLASSNAME_ARG_CONTROL } from '../../utils';

const meta: Meta<StarButtonProps> = {
  title: 'Components/Button/Tests',
  tags: ['visualtests'],
  parameters: {
    layout: 'centered'
  },
  render: (args) => {
    return (
      <Button.Star
        {...args}
      />
    )
  },
  component: Button.Star,
  argTypes: {
    active: BOOLEAN_CONTROL,
    hasError: BOOLEAN_CONTROL,
    className: CLASSNAME_ARG_CONTROL
  },
};

export default meta;

export const RendersButtonStar: StoryObj<StarButtonProps> = {}

export const RendersButtonStarActive: StoryObj<StarButtonProps> = {
  args: { active: true }
}
export const RendersButtonStarError: StoryObj<StarButtonProps> = {
  args: { hasError: true }
}
export const RendersButtonStarActiveError: StoryObj<StarButtonProps> = {
  args: {
    hasError: true,
    active: true
  }
}
export const RendersButtonStarDisabled: StoryObj<StarButtonProps> = {
  args: { disabled: true }
}
export const RendersButtonStarDisabledActive: StoryObj<StarButtonProps> = {
  args: {
    disabled: true,
    active: true
  }
}
