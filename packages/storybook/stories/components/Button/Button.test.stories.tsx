import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '@synerise/ds-button';
import type { ButtonProps } from '@synerise/ds-button';
import { userEvent, expect, waitFor, within } from '@storybook/test';

import { DisabledTooltip } from './Button.stories';
import { DisabledButtonsWithTooltip } from './ButtonGroup.stories';

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

const BUTTON_LABEL = 'BUTTON_LABEL';
export const RendersDisabledTooltip: StoryObj<ButtonProps> = {
  ...DisabledTooltip,
  args: {
    ...DisabledTooltip.args,
    children: BUTTON_LABEL
  },
  parameters: {
    pseudo: { hover: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.hover(canvas.getByText(BUTTON_LABEL));
    await waitFor(() => expect(canvas.getByText('This element is disabled')).toBeVisible())
  },
};


export const RendersDisabledTooltipInButtonGroup: StoryObj<ButtonProps> = {
  ...DisabledButtonsWithTooltip,
  parameters: {
    pseudo: { hover: true },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.hover(canvas.getByText('Label'));
    await waitFor(() => expect(canvas.getByText('Tooltip 1 title')).toBeVisible())
  },
};
