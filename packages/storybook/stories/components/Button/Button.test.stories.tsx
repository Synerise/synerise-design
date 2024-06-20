import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import type { ButtonProps } from '@synerise/ds-button';
import { userEvent, within } from '@storybook/test';

import { DisabledTooltip } from './Button.stories';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button/Tests',
  tags: ['visualtests'],
  parameters: {
    layout: 'centered',
  },
  render: args => {
    return <Button {...args} />;
  },
  component: Button,
};

export default meta;

export const RendersDisabledTooltip: StoryObj<ButtonProps> = {
  ...DisabledTooltip,
  parameters: {
    pseudo: { hover: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByTestId('button-disabled-wrapper'));
  },
};
